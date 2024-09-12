import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailerDto, UpdateMailerDto } from './dto';
import { } from './dto/update-mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  create(@Body() createMailerDto: CreateMailerDto) {
    return this.mailerService.createMailer(createMailerDto);
  }

  @Get()
  findAll() {
    return this.mailerService.findAllMailers({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailerService.findMailer(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
    return this.mailerService.updateMailer(id, updateMailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailerService.removeMailer(id);
  }
}
