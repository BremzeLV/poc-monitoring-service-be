import { ConflictException, Injectable } from '@nestjs/common';
import { DeviceRepository } from './infrastructure/persistence/device.repository';
import { Device } from './domain/device';
import { FindManyOptions } from 'typeorm';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DeviceRepository) {}

  async update(
    id: Device['id'],
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device | null> {
    return this.devicesRepository.update(id, updateDeviceDto);
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const existingDevice = await this.devicesRepository.find({
      where: { ip: createDeviceDto.ip, protocol: createDeviceDto.protocol },
    });

    if (existingDevice.length) {
      throw new ConflictException(
        'Device with same IP and protocol already exists',
      );
    }

    return this.devicesRepository.create(createDeviceDto);
  }

  async find(options: FindManyOptions<Device>): Promise<Device[]> {
    return this.devicesRepository.find(options);
  }

  async remove(id: Device['id']): Promise<void> {
    await this.devicesRepository.remove(id);
  }
}
