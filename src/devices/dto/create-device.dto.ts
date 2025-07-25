import { ApiProperty } from '@nestjs/swagger';

import { DeviceProtocol } from '../devices.types';
import { IsEnum, IsString } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ type: String })
  @IsString()
  ip: string;

  @ApiProperty({ enum: DeviceProtocol })
  @IsEnum(DeviceProtocol)
  protocol: DeviceProtocol;
}
