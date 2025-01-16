import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MailTemplateService, EMailTemplateService } from './services';
import {
  CreateMailTemplateDto,
  UpdateMailTemplateDto,
  CreateEMailTemplateDto,
  UpdateEMailTemplateDto,
} from './dto';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Controller('mailers')
export class MailerController {
  constructor(
    private readonly mailTemplateService: MailTemplateService,
    private readonly emailTemplateService: EMailTemplateService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/mail-templates')
  create(@Body() createMailTemplateDto: CreateMailTemplateDto) {
    return this.mailTemplateService.create(createMailTemplateDto);
  }

  @Get('/mail-templates')
  findAll() {
    return this.mailTemplateService.findAll({});
  }

  @Get('/mail-templates/:id')
  findOne(@Param('id') id: string) {
    return this.mailTemplateService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/mail-templates/:id')
  update(
    @Param('id') id: string,
    @Body() updateMailTemplateDto: UpdateMailTemplateDto,
  ) {
    return this.mailTemplateService.update(id, updateMailTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/mail-templates/:id')
  remove(@Param('id') id: string) {
    return this.mailTemplateService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/email-templates')
  createEmailTemplate(@Body() createEMailTemplateDto: CreateEMailTemplateDto) {
    return this.emailTemplateService.create(createEMailTemplateDto);
  }

  @Get('/email-templates')
  findAllEmailTemplate() {
    return this.emailTemplateService.findAll({});
  }

  @Get('/email-templates/:id')
  findOneEmailTemplate(@Param('id') id: string) {
    return this.emailTemplateService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/email-templates/:id')
  updateEmailTemplate(
    @Param('id') id: string,
    @Body() updateEMailTemplateDto: UpdateEMailTemplateDto,
  ) {
    return this.emailTemplateService.update(id, updateEMailTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/email-templates/:id')
  removeEmailTemplate(@Param('id') id: string) {
    return this.emailTemplateService.remove(id);
  }
}
