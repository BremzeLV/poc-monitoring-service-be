import { Module } from '@nestjs/common';
import { DevicesMockController } from './devices-mock.controller';

@Module({
  controllers: [DevicesMockController],
})
export class DevicesMockModule {}
