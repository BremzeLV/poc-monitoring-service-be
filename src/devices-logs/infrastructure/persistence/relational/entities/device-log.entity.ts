import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { DeviceStatus } from '../../../../../devices/devices.types';

@Entity({
  name: 'device-log',
})
export class DeviceLogEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  deviceId: number;

  @Index()
  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.Unknown,
  })
  status: DeviceStatus;

  @Index()
  @Column({ type: 'timestamp' })
  pingAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  cpuLoad: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  memoryUsage: number;

  @Column()
  swVersion: string;

  @Column()
  fwVersion: string;

  @Column()
  hwVersion: string;

  @CreateDateColumn()
  createdAt: Date;
}
