import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DevicesCommunicationHealthDto } from './dto/devices-communication-health.dto';
import { Device } from '../devices/domain/device';
import { DeviceEndpoint } from './devices-communication.types';
import { DeviceProtocol } from '../devices/devices.types';
import { GRPCService } from '../grpc/grpc.service';

@Injectable()
export class DevicesCommunicationService {
  private maxTimeout = 3000;

  constructor(
    private readonly httpService: HttpService,
    private readonly gRPCService: GRPCService,
  ) {}

  async getDeviceHealth(
    device: Device,
  ): Promise<DevicesCommunicationHealthDto> {
    return this.callDevice<DevicesCommunicationHealthDto>(
      device,
      DeviceEndpoint.Health,
    );
  }

  protected async callDevice<T extends object>(
    device: Device,
    endpoint: DeviceEndpoint,
  ): Promise<T> {
    if (device.protocol === DeviceProtocol.GRPC) {
      return this.callDeviceGRPC<T>(device, endpoint);
    }

    return this.callDeviceHttp<T>(device, endpoint);
  }

  protected async callDeviceGRPC<T extends object>(
    device: Device,
    endpoint: DeviceEndpoint,
  ): Promise<T> {
    const gRPCClient = this.gRPCService.setClient(device.ip);
    return new Promise<T>((resolve, reject) => {
      gRPCClient[endpoint](
        {},
        { deadline: new Date(Date.now() + this.maxTimeout) },
        (err, response) => {
          if (err) {
            return reject(err);
          }
          resolve(response as T);
        },
      );
    });
  }

  protected async callDeviceHttp<T extends object>(
    device: Device,
    endpoint: DeviceEndpoint,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(`${device.protocol}://${device.ip}/${endpoint}`, {
        timeout: this.maxTimeout,
      }),
    );

    return response.data;
  }
}
