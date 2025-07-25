import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DeviceStatus } from '../../devices/devices.types';

export class CreateDeviceLogDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  deviceId: number;

  @ApiProperty({
    enum: DeviceStatus,
  })
  @IsEnum(DeviceStatus)
  status: DeviceStatus;

  @ApiProperty({
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  pingAt: Date;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  cpuLoad: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  swVersion: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  fwVersion: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  hwVersion: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  memoryUsage: number;
}
