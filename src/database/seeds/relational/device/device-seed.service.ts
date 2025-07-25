import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from '../../../../devices/infrastructure/persistence/relational/entities/device.entity';
import { DeviceProtocol } from '../../../../devices/devices.types';

@Injectable()
export class DeviceSeedService {
  constructor(
    @InjectRepository(DeviceEntity)
    private repository: Repository<DeviceEntity>,
  ) {}

  async run() {
    const countDevices = await this.repository.count();
    if (countDevices) {
      return;
    }

    await this.repository.save(
      this.repository.create([
        {
          ip: 'device-mock-1:3001',
          protocol: DeviceProtocol.Http,
        },
        {
          ip: 'device-mock-2:3002',
          protocol: DeviceProtocol.Https,
        },
        {
          ip: 'device-mock-2:50051',
          protocol: DeviceProtocol.GRPC,
        },
        {
          ip: 'helloUbiquiti:50051',
          protocol: DeviceProtocol.GRPC,
        },
        {
          ip: 'helloUbiquiti:1337',
          protocol: DeviceProtocol.Http,
        },
      ]),
    );
  }
}
