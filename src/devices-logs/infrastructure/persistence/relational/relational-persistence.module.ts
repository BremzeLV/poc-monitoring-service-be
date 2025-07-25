import { Module } from '@nestjs/common';
import { DeviceLogRepository } from '../device-log.repository';
import { DevicesLogRelationalRepository } from './repositories/device-log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceLogEntity } from './entities/device-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceLogEntity])],
  providers: [
    {
      provide: DeviceLogRepository,
      useClass: DevicesLogRelationalRepository,
    },
  ],
  exports: [DeviceLogRepository],
})
export class RelationalDevicesLogsPersistenceModule {}
