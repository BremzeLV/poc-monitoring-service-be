import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';
import { DeviceProto } from './grpc.types';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';

@Injectable()
export class GRPCService implements OnModuleInit {
  private client: ServiceClient;
  private proto: DeviceProto;

  setClient(address: string): ServiceClient {
    this.client = new this.proto.device.DeviceService(
      address,
      grpc.credentials.createInsecure(),
    );

    return this.client;
  }

  onModuleInit(): void {
    const packageDefinition = protoLoader.loadSync(
      join(__dirname, 'proto/device.proto'),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    );

    this.proto = grpc.loadPackageDefinition(
      packageDefinition,
    ) as unknown as DeviceProto;
  }
}
