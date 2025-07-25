import { Device } from '../../../../domain/device';
import { DeviceEntity } from '../entities/device.entity';

export class DeviceMapper {
  static toDomain(raw: DeviceEntity): Device {
    const domainEntity = new Device();
    domainEntity.id = raw.id;
    domainEntity.ip = raw.ip;
    domainEntity.status = raw.status;
    domainEntity.protocol = raw.protocol;
    domainEntity.lastPing = raw.lastPing;
    domainEntity.checksum = raw.checksum;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Device): DeviceEntity {
    const persistenceEntity = new DeviceEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.ip = domainEntity.ip;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.protocol = domainEntity.protocol;
    persistenceEntity.lastPing = domainEntity.lastPing;
    persistenceEntity.checksum = domainEntity.checksum;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
