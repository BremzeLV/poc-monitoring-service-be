/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaTopics } from '../kafka/kafka.types';
import { DevicesService } from '../devices/devices.service';
import { IsNull, LessThan } from 'typeorm';
import { DeviceDataRetrievalMessage } from '../kafka/consumers/device-data-retrieval/device-data-retrieval.types';

@Injectable()
export class TasksService {
    constructor(
        private readonly kafkaService: KafkaService,
        private readonly devicesService: DevicesService,
    ) { }

    @Cron(CronExpression.EVERY_MINUTE, { name: 'device-health-every-minute'})
    async handleCron() {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const devices = await this.devicesService.find({
            where: [
                { lastPing: LessThan(oneMinuteAgo) },
                { lastPing: IsNull() },
            ]
        });
                
        for (const device of devices) {
            this.kafkaService.emit<DeviceDataRetrievalMessage>(KafkaTopics.DeviceDataRetrieval, {
                device: { ...device },
                retryCount: 0,
            })
        }
    }
}
