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
import { CreateMailerDto, UpdateMailerDto } from './dto';
import {} from './dto/update-mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  create(@Body() createMailerDto: CreateMailerDto) {
    return this.mailerService.create(createMailerDto);
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
  update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
    return this.mailerService.update(id, updateMailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailerService.remove(id);
  }
}
