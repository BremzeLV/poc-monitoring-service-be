import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE_BINDING } from './kafka.types';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  constructor(
    @Inject(KAFKA_SERVICE_BINDING) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  emit<T extends object>(topic: string, message: T) {
    return this.kafkaClient.emit(topic, message);
  }

  getClient(): ClientKafka {
    return this.kafkaClient;
  }
}
