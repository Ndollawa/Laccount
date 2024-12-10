import { UserSeed } from './../../../../src/user/seeds/user.seed';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppSettingsSeed } from 'src/appsetting/seeds/appsettings.seed';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly appSettingsSeed: AppSettingsSeed,
    private readonly userSeed: UserSeed,
    private readonly configService: ConfigService,
  ) {}

  onApplicationBootstrap(): any {
    // add a functionality to check if the data already exists, if not add it manually
    this.appSettingsSeed.seedSettings();
    this.userSeed.seedUser();
  }
}
