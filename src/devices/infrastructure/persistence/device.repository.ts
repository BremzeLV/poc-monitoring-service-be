import { FindManyOptions } from 'typeorm';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { Device } from '../../domain/device';

export abstract class DeviceRepository {
  abstract create(
    data: Omit<
      Device,
      | 'id'
      | 'status'
      | 'lastPing'
      | 'checksum'
      | 'createdAt'
      | 'deletedAt'
      | 'updatedAt'
    >,
  ): Promise<Device>;
  abstract find(filterOptions: FindManyOptions<Device>): Promise<Device[]>;
  abstract update(
    id: Device['id'],
    payload: DeepPartial<Device>,
  ): Promise<Device | null>;
  abstract remove(id: Device['id']): Promise<void>;
}
