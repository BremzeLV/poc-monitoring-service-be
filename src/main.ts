import 'dotenv/config';
import {
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import ensureTopics from './kafka/utils/ensure-topics';

async function bootstrap() {
  await ensureTopics();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: [
        { path: '/', method: RequestMethod.GET },
        { path: '/devices-logs/:id', method: RequestMethod.GET },
        { path: '/devices/add', method: RequestMethod.GET },
      ],
    },
  );
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.connectMicroservice(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.getOrThrow('kafka.clientId', { infer: true }),
          brokers: configService.getOrThrow('kafka.brokers', { infer: true }),
        },
        consumer: {
          groupId: configService.getOrThrow('kafka.consumerGroupId', {
            infer: true,
          }),
        },
      },
    },
    { inheritAppConfig: true },
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
      schema: {
        example: 'en',
      },
    })
    .build();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      helpers: handlebarsHelpers,
    }),
  );
  app.setViewEngine('hbs');

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
