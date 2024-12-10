import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisService } from '@app/common';
import { RequestService } from '@app/common/services';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { LocalStrategy } from './strategies/local-strategy';
import { AuthEventsService } from './auth.events';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'local',
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthEventsService,
    AuthService,
  ],
  exports: [JwtStrategy, AuthService, AuthEventsService],
})
export class AuthModule {}
