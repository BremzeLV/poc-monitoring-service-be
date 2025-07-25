import { NestFactory } from '@nestjs/core';
import { DeviceSeedService } from './device/device-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(DeviceSeedService).run();

  await app.close();
};

void runSeed();
