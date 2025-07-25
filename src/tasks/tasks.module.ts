import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { KafkaModule } from '../kafka/kafka.module';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [KafkaModule, DevicesModule],
  providers: [TasksService],
})
export class TasksModule {}
