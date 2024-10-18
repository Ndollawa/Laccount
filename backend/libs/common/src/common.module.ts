import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CacheModule,
  CacheManagerOptions,
  CacheStore,
} from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';
// import type { RedisClientOptions } from 'redis';
import { SeederModule } from './seeder/seeder.module';

import { RedisModule } from './redis/redis.module';
import { CacheService, RequestService } from './services';
import { SeederService } from './seeder/seeder.service';
import { RedisService } from './redis';
import { AppsettingModule } from 'src/appsetting';
import { UserModule } from 'src/user';

@Global()
@Module({
  providers: [RequestService, SeederService, CacheService, RedisService],
  exports: [RequestService, SeederService, RedisService],
  imports: [
    forwardRef(() =>
      ConfigModule.forRoot({
        envFilePath: ['.env.development.local', '.env.development', '.env'],
        isGlobal: true,
        cache: true,
      }),
    ),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   isGlobal: true,
    //   useFactory: async (
    //     configService: ConfigService,
    //   ): Promise<CacheManagerOptions> => {
    //     const store = await redisStore({
    //       commandsQueueMaxLength: 10_000,
    //       socket: {
    //         host: configService.getOrThrow<string>('REDIS_HOST', 'localhost'),
    //         port: configService.getOrThrow<number>('REDIS_PORT', 6379),
    //       }
    //       ttl: configService.getOrThrow<number>('CACHE_TTL', 600),
    //     });
    //     return { store: store as unknown as CacheStore };
    //   },
    // }),
    forwardRef(() => AppsettingModule),
    forwardRef(() => UserModule),
    SeederModule,
    RedisModule,
  ],
})
export class CommonModule {}
