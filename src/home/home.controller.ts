import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DevicesService } from '../devices/devices.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  @Render('index.hbs')
  root() {
    const devices = this.devicesService.find({ order: { id: 'DESC' } });
    return { devices };
  }
}
