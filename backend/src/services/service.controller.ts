import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileOptions2 } from '@app/common';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', FileOptions2('./uploads/settings/services')),
  )
  create(
    @Body() createServiceDto: CreateServiceDto,
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
    return this.serviceService.create(createServiceDto, file);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.find(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', FileOptions2('./uploads/settings/services')),
  )
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
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
    return this.serviceService.update(id, updateServiceDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
