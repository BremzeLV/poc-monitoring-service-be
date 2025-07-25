import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { DeviceProtocol, DeviceStatus } from '../../../../devices.types';

@Entity({
  name: 'device',
})
export class DeviceEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Index()
  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.Unknown,
  })
  status: DeviceStatus;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  lastPing: Date | null;

  @Column({
    type: 'enum',
    enum: DeviceProtocol,
    default: DeviceProtocol.Https,
  })
  protocol: DeviceProtocol;

  @Column({ type: String, nullable: true })
  checksum: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
