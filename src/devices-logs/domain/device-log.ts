import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '../../devices/devices.types';

export class DeviceLog {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: Number,
  })
  deviceId: number;

  @ApiProperty({
    enum: DeviceStatus,
  })
  status: DeviceStatus;

  @ApiProperty({
    type: Date,
  })
  pingAt: Date;

  @ApiProperty({
    type: Number,
  })
  cpuLoad: number;

  @ApiProperty({
    type: Number,
  })
  memoryUsage: number;

  @ApiProperty({
    type: String,
  })
  swVersion: string;

  @ApiProperty({
    type: String,
  })
  fwVersion: string;

  @ApiProperty({
    type: String,
  })
  hwVersion: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;
}
