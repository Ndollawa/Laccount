import { Module } from '@nestjs/common';
import { COMMUNICATION_SERVICE, RequestService } from '@app/common';
import { PrismaModule } from '@app/prisma';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './services/refreshToken.service';
import { ProfileService } from './services/profile.service';
import { RefreshTokenRepository } from './repositories/refreshToken.repository';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [
    UserRepository,
    UserService,
    RequestService,
    RefreshTokenRepository,
    RefreshTokenService,
    ProfileService,
    ProfileRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
