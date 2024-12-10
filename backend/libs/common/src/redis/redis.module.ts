import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { Redis } from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule], // ConfigModule should be imported at the module level
  providers: [
    {
      provide: 'RedisClient',
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => {
        const redisInstance = new Redis({
          port: configService.get<number>('REDIS_PORT', 6379),
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          password: configService.get<string>('REDIS_PASSWORD', ''),
          connectTimeout: 10000,
          retryStrategy: (times: number) => {
            const delay = Math.min(times * 100, 3000); // Exponential backoff, max wait 3 seconds
            console.log(
              `Retrying Redis connection in ${delay / 1000} seconds...`,
            );
            return delay; // Delay time in milliseconds for the next reconnect attempt
          },
        });

        redisInstance.on('error', (e) => {
          console.error(`Redis connection failed: ${e.message}`);
        });

        redisInstance.on('reconnecting', (time) => {
          console.log(`Reconnecting to Redis... Retry after ${time} ms`);
        });

        redisInstance.on('connect', () => {
          console.log('Connected to Redis');
        });

        redisInstance.on('ready', () => {
          console.log('Redis connection is ready');
        });

        return redisInstance;
      },
    },
    RedisService,
  ],
  exports: ['RedisClient', RedisService], // Export RedisClient and RedisService
})
export class RedisModule {}
