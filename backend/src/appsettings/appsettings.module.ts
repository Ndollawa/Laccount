import { Module } from '@nestjs/common';
import { AppsettingsService } from './appsettings.service';
import { AppsettingsController } from './appsettings.controller';

@Module({
  controllers: [AppsettingsController],
  providers: [AppsettingsService],
})
export class AppsettingsModule {}
