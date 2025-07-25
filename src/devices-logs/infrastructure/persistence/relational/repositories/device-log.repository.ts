import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, FindManyOptions } from 'typeorm';
import { DeviceLogRepository } from '../../device-log.repository';
import { DeviceLogEntity } from '../entities/device-log.entity';
import { DeviceLog } from '../../../../domain/device-log';
import { DeviceLogMapper } from '../mappers/device-log.mapper';

@Injectable()
export class DevicesLogRelationalRepository implements DeviceLogRepository {
  constructor(
    @InjectRepository(DeviceLogEntity)
    private readonly devicesLogsRepository: Repository<DeviceLogEntity>,
  ) {}

  async create(data: DeviceLog): Promise<DeviceLog> {
    const persistenceModel = DeviceLogMapper.toPersistence(data);
    const newEntity = await this.devicesLogsRepository.save(
      this.devicesLogsRepository.create(persistenceModel),
    );
    return DeviceLogMapper.toDomain(newEntity);
  }

  async find(options: FindManyOptions<DeviceLog>): Promise<DeviceLog[]> {
    const entities = await this.devicesLogsRepository.find(options);
    return entities.map(DeviceLogMapper.toDomain);
  }
}
