import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => {
  return {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER],
    consumerGroupId: process.env.KAFKA_CONSUMER_GROUP_ID,
  };
});
