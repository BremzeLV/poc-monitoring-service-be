import { DeviceLog } from '../../../../domain/device-log';
import { DeviceLogEntity } from '../entities/device-log.entity';

export class DeviceLogMapper {
  static toDomain(raw: DeviceLogEntity): DeviceLog {
    const domainEntity = new DeviceLog();
    domainEntity.id = raw.id;
    domainEntity.deviceId = raw.deviceId;
    domainEntity.status = raw.status;
    domainEntity.pingAt = raw.pingAt;
    domainEntity.cpuLoad = raw.cpuLoad;
    domainEntity.memoryUsage = raw.memoryUsage;
    domainEntity.swVersion = raw.swVersion;
    domainEntity.fwVersion = raw.fwVersion;
    domainEntity.hwVersion = raw.hwVersion;
    domainEntity.createdAt = raw.createdAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: DeviceLog): DeviceLogEntity {
    const persistenceEntity = new DeviceLogEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.deviceId = domainEntity.deviceId;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.pingAt = domainEntity.pingAt;
    persistenceEntity.cpuLoad = domainEntity.cpuLoad;
    persistenceEntity.memoryUsage = domainEntity.memoryUsage;
    persistenceEntity.swVersion = domainEntity.swVersion;
    persistenceEntity.fwVersion = domainEntity.fwVersion;
    persistenceEntity.hwVersion = domainEntity.hwVersion;
    persistenceEntity.createdAt = domainEntity.createdAt;
    return persistenceEntity;
  }
}
