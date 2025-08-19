import { createClient } from 'redis';

let client;

export function getRedisClient() {
  if (!client) {
    const url = process.env.REDIS_URL || 'redis://redis:6379';
    client = createClient({ url });
    client.on('error', (err) => console.error('Redis Client Error', err));
  }
  return client;
}