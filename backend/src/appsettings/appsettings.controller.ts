import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppSettingsService } from './appsettings.repository';
import { CreateAppSettingsDto , UpdateAppSettingsDto} from './dto';
import { CreateAccountDto } from 'src/account/dto';

@Controller('AppSettings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}
  @Post()
  create(@Body() createAppSettingsDto: CreateAppSettingsDto & CreateAccountDto) {
    return this.appSettingsService.createAppSettings(createAppSettingsDto);
  }

  @Get()
  findAll() {
    return this.appSettingsService.findAllAppSettingss({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appSettingsService.findAppSettings(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppSettingsDto: UpdateAppSettingsDto) {
    return this.appSettingsService.updateAppSettings(id, updateAppSettingsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appSettingsService.removeAppSettings(id);
  }
}
