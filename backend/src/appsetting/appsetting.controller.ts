import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { join } from 'path';
import { AppSettingService } from './appsetting.service';
import {
  CreateAppSettingsDto,
  UpdateAppSettingsDto,
  SettingFileUploadDto,
  HomeSlide,
  SliderDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileOptions2 } from '@app/common/helpers/file-filter.helper';

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

  @Post('slides')
  @UseInterceptors(
    FileInterceptor('image', FileOptions2('./uploads/settings/slides')),
  )
  updateSlider(
    @Body()
    {
      type,
      id,
      slide,
    }: { id: string; slide: SliderDto } & SettingFileUploadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.appSettingsService.updateSlider({
      id,
      type,
      slide: JSON.parse(slide as string),
      file,
    });
  }

  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', FileOptions2('./uploads/settings/brand')),
  )
  uploadFile(
    @Body() { type, id }: SettingFileUploadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.appSettingsService.upload({ id, type, file });
  }

  @Post('remove-uploads')
  removeUploadeFile(@Body() { type, id, file }: SettingFileUploadDto) {
    console.log(file);
    return this.appSettingsService.removeUpload({ id, type, file });
  }
}
