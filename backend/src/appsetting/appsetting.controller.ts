import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppSettingService } from './appsetting.service';
import { CreateAppSettingsDto, UpdateAppSettingsDto } from './dto';

@Controller('app-settings')
export class AppSettingController {
  constructor(private readonly appSettingsService: AppSettingService) {}
  @Post()
  create(@Body() createAppSettingsDto: CreateAppSettingsDto) {
    return this.appSettingsService.create(createAppSettingsDto);
  }

  @Get()
  findAll() {
    return this.appSettingsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appSettingsService.find({ id });
  }

  @Get('type/:type')
  findByField(@Param('type') type: string) {
    return this.appSettingsService.find({ type });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppSettingsDto: UpdateAppSettingsDto,
  ) {
    return this.appSettingsService.update(id, updateAppSettingsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appSettingsService.remove(id);
  }
}
