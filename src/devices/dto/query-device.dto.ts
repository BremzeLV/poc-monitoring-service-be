import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Device } from '../domain/device';

export class FilterDeviceDto {}

export class SortDeviceDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Device;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryDeviceDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;
}
