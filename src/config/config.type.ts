import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { KafkaConfig } from '../kafka/config/kafka-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  kafka: KafkaConfig;
};
