import { ApiProperty } from '@nestjs/swagger';
import { DeviceProtocol, DeviceStatus } from '../devices.types';

export class Device {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  ip: string;

  @ApiProperty({
    enum: DeviceStatus,
  })
  status: DeviceStatus;

  @ApiProperty({ type: Date })
  lastPing: Date | null;

  @ApiProperty({ enum: DeviceProtocol })
  protocol: DeviceProtocol;

  @ApiProperty({ type: String })
  checksum: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
