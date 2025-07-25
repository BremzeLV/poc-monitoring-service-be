import { Module } from '@nestjs/common';

import { DevicesCommunicationService } from './devices-communication.service';
import { HttpModule } from '@nestjs/axios';
import { GRPCModule } from '../grpc/grpc.module';

@Module({
  imports: [HttpModule, GRPCModule],
  providers: [DevicesCommunicationService],
  exports: [DevicesCommunicationService],
})
export class DevicesCommunicationModule {}
