import { Module } from '@nestjs/common';

import { DeviceSeedService } from './device-seed.service';
import { DeviceEntity } from '../../../../devices/infrastructure/persistence/relational/entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceSeedService],
  exports: [DeviceSeedService],
})
export class DeviceSeedModule {}
