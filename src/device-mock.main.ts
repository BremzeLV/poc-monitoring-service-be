import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { DevicesMockModule } from './devices-mock/devices-mock.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(DevicesMockModule, { cors: true });
  useContainer(app.select(DevicesMockModule), { fallbackOnErrors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'device',
      protoPath: join(__dirname, 'grpc/proto/device.proto'),
      url: `0.0.0.0:${process.env.GRPC_APP_PORT ?? 50051}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT ?? 3010);

  const logger = new Logger('bootstarp');
  logger.log(`APP started port: ${process.env.APP_PORT}`);
}
void bootstrap();
