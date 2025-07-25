import { Controller, Get, Param, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevicesLogsService } from './devices-logs.service';

@ApiTags('DevicesLogs')
@Controller({
  path: 'devices-logs',
  version: '1',
})
export class DevicesLogsController {
  constructor(private readonly devicesLogsService: DevicesLogsService) {}

  @Get(':id')
  @Render('devices-logs.hbs')
  async logs(@Param('id') id: number) {
    const deviceLogs = await this.devicesLogsService.find({
      where: { deviceId: id },
      order: { id: 'DESC' },
    });

    return { deviceId: id, deviceLogs };
  }
}
