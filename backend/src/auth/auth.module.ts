import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/prisma';
import {
  LoggingInterceptor,
  // ResponseInterceptor,
} from '@app/common';
import { RequestService } from '@app/common/services';
import {
  UserService,
  UserModule,
  UserRepository,
  RefreshTokenService,
  RefreshTokenRepository,
} from '../user';

import { AuthController } from './auth.controller';
import { join } from 'path';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { AuthEventsService } from './auth.events';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
    }),
    PassportModule.register({
      defaultStrategy: 'local',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    RequestService,
    UserRepository,
    UserService,
    RefreshTokenService,
    RefreshTokenRepository,
    AuthService,
    RequestService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthEventsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AuthModule {}
