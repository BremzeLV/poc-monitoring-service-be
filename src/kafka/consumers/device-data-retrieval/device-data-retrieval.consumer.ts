import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { KafkaTopics } from '../../kafka.types';
import { DeviceDataRetrievalMessage } from './device-data-retrieval.types';
import { DevicesService } from '../../../devices/devices.service';
import { DevicesCommunicationService } from '../../../devices-communication/devices-communication.service';
import { DevicesLogsService } from '../../../devices-logs/devices-logs.service';
import { DeviceStatus } from '../../../devices/devices.types';
import Big from 'big.js';
import { KafkaService } from '../../kafka.service';
import { WebsocketsService } from '../../../websockets/websockets.service';

@Controller()
export class DeviceDataRetrievalConsumer {
  private readonly logger = new Logger(DeviceDataRetrievalConsumer.name);
  private readonly allowedNumberOfRetries = 5;

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly websocketsService: WebsocketsService,
    private readonly devicesService: DevicesService,
    private readonly devicesLogsService: DevicesLogsService,
    private readonly devicesCommunicationService: DevicesCommunicationService,
  ) {}

  @EventPattern(KafkaTopics.DeviceDataRetrieval, Transport.KAFKA)
  async handleDataRetrieval(
    @Payload() message: DeviceDataRetrievalMessage,
    @Ctx() context: KafkaContext,
  ) {
    const pingTime = new Date();
    const { device, retryCount } = message;

    this.logger.log(`Calling device: ${device.ip}`);

    await this.devicesService.update(device.id, { lastPing: pingTime });

    try {
      const health =
        await this.devicesCommunicationService.getDeviceHealth(device);

      await this.devicesLogsService.create({
        deviceId: device.id,
        status: DeviceStatus.Online,
        pingAt: pingTime,
        cpuLoad: Big(health.cpuLoad ?? 0).toFixed(2),
        memoryUsage: Big(health.memoryUsage ?? 0).toFixed(2),
        swVersion: health.swVersion ?? '',
        fwVersion: health.fwVersion ?? '',
        hwVersion: health.hwVersion ?? '',
      });

      const updatedDevice = await this.devicesService.update(device.id, {
        status: DeviceStatus.Online,
      });

      if (updatedDevice) {
        this.websocketsService.broadcastDeviceUpdate(updatedDevice);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      this.logger.log(
        `Calling device failure: ${device.ip}. Retry number: ${retryCount}`,
      );

      await this.devicesLogsService.create({
        deviceId: device.id,
        status: DeviceStatus.Offline,
        pingAt: pingTime,
        cpuLoad: 0,
        memoryUsage: 0,
        swVersion: '',
        fwVersion: '',
        hwVersion: '',
      });

      if (retryCount + 1 < this.allowedNumberOfRetries) {
        setTimeout(() => {
          this.kafkaService.emit<DeviceDataRetrievalMessage>(
            KafkaTopics.DeviceDataRetrieval,
            {
              retryCount: retryCount + 1,
              device,
            },
          );
        }, 1000);
      } else {
        const updatedDevice = await this.devicesService.update(device.id, {
          status: DeviceStatus.Offline,
        });

        if (updatedDevice) {
          this.websocketsService.broadcastDeviceUpdate(updatedDevice);
        }
      }
    }

    await this.commitOffest(context);
  }

  private async commitOffest(context: KafkaContext) {
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    const consumer = context.getConsumer();

    await consumer.commitOffsets([{ topic, partition, offset }]);
  }
}
