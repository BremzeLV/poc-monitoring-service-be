import { Module } from '@nestjs/common';

import { GRPCService } from './grpc.service';

@Module({
  providers: [GRPCService],
  exports: [GRPCService],
})
export class GRPCModule {}
