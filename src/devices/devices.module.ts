import { Module } from '@nestjs/common';

import { DevicesController } from './devices.controller';

import { DevicesService } from './devices.service';
import { RelationalDevicePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalDevicePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService, infrastructurePersistenceModule],
})
export class DevicesModule {}
