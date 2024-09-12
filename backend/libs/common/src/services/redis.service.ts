import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.redis.set(key, value);
    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async delete(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
