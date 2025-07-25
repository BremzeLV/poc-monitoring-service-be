import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { DeviceLogRepository } from './infrastructure/persistence/device-log.repository';
import { DeviceLog } from './domain/device-log';
import { CreateDeviceLogDto } from './dto/create-device-log.dto';

@Injectable()
export class DevicesLogsService {
  constructor(private readonly devicesLogsRepository: DeviceLogRepository) {}

  async create(createDeviceLogDto: CreateDeviceLogDto): Promise<DeviceLog> {
    return this.devicesLogsRepository.create(createDeviceLogDto);
  }

  find(options: FindManyOptions<DeviceLog>): Promise<DeviceLog[]> {
    return this.devicesLogsRepository.find(options);
  }
}
