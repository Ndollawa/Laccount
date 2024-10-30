import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailTemplateDto, UpdateMailTemplateDto } from './dto';
import {} from './dto/update-mailer.dto';

@Controller('mailers')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  create(@Body() createMailTemplateDto: CreateMailTemplateDto) {
    return this.mailerService.create(createMailTemplateDto);
  }

  @Get()
  findAll() {
    return this.mailerService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailerService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMailTemplateDto: UpdateMailTemplateDto,
  ) {
    return this.mailerService.update(id, updateMailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailerService.remove(id);
  }
}
