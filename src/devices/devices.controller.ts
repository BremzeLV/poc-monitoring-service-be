import { Controller, Get, Render, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceProtocol } from './devices.types';

@ApiTags('Devices')
@Controller({
  path: 'devices',
  version: '1',
})
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('/add')
  @Render('devices-create.hbs')
  logs() {
    return {
      protocols: Object.values(DeviceProtocol),
    };
  }

  @Post('/create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: CreateDeviceDto,
  ) {
    await this.devicesService.create(dto);

    return res.redirect('/');
  }
}
