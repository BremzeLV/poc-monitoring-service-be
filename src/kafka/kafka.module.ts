import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaService } from './kafka.service';
import { AllConfigType } from '../config/config.type';
import { DeviceDataRetrievalConsumer } from './consumers/device-data-retrieval/device-data-retrieval.consumer';
import { DevicesModule } from '../devices/devices.module';
import { DevicesCommunicationModule } from '../devices-communication/devices-communication.module';
import { DevicesLogsModule } from '../devices-logs/devices-logs.module';
import { WebsocketsModule } from '../websockets/websockets.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService<AllConfigType>) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.getOrThrow('kafka.clientId', {
                infer: true,
              }),
              brokers: configService.getOrThrow('kafka.brokers', {
                infer: true,
              }),
            },
            consumer: {
              groupId: configService.getOrThrow('kafka.consumerGroupId', {
                infer: true,
              }),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    DevicesModule,
    DevicesLogsModule,
    DevicesCommunicationModule,
    WebsocketsModule,
  ],
  controllers: [DeviceDataRetrievalConsumer],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
