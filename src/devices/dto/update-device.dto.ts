import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { DeviceProtocol, DeviceStatus } from '../devices.types';

export class UpdateDeviceDto {
  @ApiPropertyOptional({ enum: DeviceStatus })
  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @ApiPropertyOptional({ enum: DeviceProtocol })
  @IsOptional()
  @IsEnum(DeviceProtocol)
  protocol?: DeviceProtocol;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  lastPing?: Date | null;
}
