import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DevicesCommunicationHealthDto {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  cpuLoad: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  memoryUsage: number;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  swVersion: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  fwVersion: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  hwVersion: string;
}
