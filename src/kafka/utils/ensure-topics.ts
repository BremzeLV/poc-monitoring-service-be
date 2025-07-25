import { Kafka } from 'kafkajs';
import { KafkaTopics } from '../kafka.types';

async function ensureTopics() {
  const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER!] });

  const admin = kafka.admin();

  await admin.connect();
  await admin.createTopics({
    topics: Object.values(KafkaTopics).map((topic) => ({
      topic,
      numPartitions: 1,
      replicationFactor: 1,
    })),
    waitForLeaders: true,
  });
  await admin.disconnect();
}

export default ensureTopics;
