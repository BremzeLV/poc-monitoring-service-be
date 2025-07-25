import { FindManyOptions } from 'typeorm';
import { DeviceLog } from '../../domain/device-log';

export abstract class DeviceLogRepository {
  abstract create(
    data: Omit<DeviceLog, 'id' | 'createdAt'>,
  ): Promise<DeviceLog>;

  abstract find(options: FindManyOptions<DeviceLog>): Promise<DeviceLog[]>;
}
