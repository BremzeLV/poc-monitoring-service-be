import {
  CallOptions,
  Client,
  ClientUnaryCall,
  ServiceClientConstructor,
  ServiceError,
} from '@grpc/grpc-js';

export type GRPCHealthData = {
  status: number;
  mac: string;
  cpuLoad: number;
  memoryUsage: number;
  softwareVersion: string;
};

export interface GRPCDeviceService extends Client {
  health(
    request: object,
    options: CallOptions,
    callback: (error: ServiceError | null, response: GRPCHealthData) => void,
  ): ClientUnaryCall;
}

export interface DeviceProto {
  device: {
    DeviceService: ServiceClientConstructor;
  };
}
