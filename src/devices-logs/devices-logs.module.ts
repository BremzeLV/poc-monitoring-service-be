import { Module } from '@nestjs/common';

import { DevicesLogsService } from './devices-logs.service';
import { RelationalDevicesLogsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DevicesLogsController } from './devices-logs.controller';

const infrastructurePersistenceModule = RelationalDevicesLogsPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [DevicesLogsController],
  providers: [DevicesLogsService],
  exports: [DevicesLogsService],
})
export class DevicesLogsModule {}
