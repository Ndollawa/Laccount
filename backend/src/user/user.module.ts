import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { RefreshTokenService } from './services/refreshToken.service';
import { ProfileService } from './services/profile.service';
import { RefreshTokenRepository } from './repositories/refreshToken.repository';
import { ProfileRepository } from './repositories/profile.repository';
import { UserSeed } from './seeds/user.seed';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    RefreshTokenRepository,
    RefreshTokenService,
    ProfileService,
    ProfileRepository,
    UserSeed,
  ],
  exports: [
    UserService,
    UserRepository,
    RefreshTokenService,
    ProfileService,
    UserSeed,
  ],
})
export class UserModule {}
