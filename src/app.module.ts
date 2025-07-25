import { Module } from '@nestjs/common';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import kafkaConfig from './kafka/config/kafka.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { KafkaModule } from './kafka/kafka.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { DevicesModule } from './devices/devices.module';
import { DevicesCommunicationModule } from './devices-communication/devices-communication.module';
import { GRPCModule } from './grpc/grpc.module';
import { WebsocketsModule } from './websockets/websockets.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, kafkaConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    HomeModule,
    DevicesModule,
    DevicesCommunicationModule,
    KafkaModule,
    GRPCModule,
    ScheduleModule.forRoot(),
    TasksModule,
    WebsocketsModule,
  ],
})
export class AppModule {}
