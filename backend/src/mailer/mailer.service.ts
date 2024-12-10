import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs-extra';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ISendMailOptions,
  MailerService as NestMailerService,
} from '@nestjs-modules/mailer';
import * as grpc from '@grpc/grpc-js';
import {
  Mailer,
  MailerTemplateEnum,
  ActiveStatus,
} from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { MailerRepository } from './mailer.repository';
import {
  CreateMailTemplateDto,
  CreateHandlebarTemplateDto,
  UpdateMailTemplateDto,
  SendMailDto,
} from './dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class MailerService {
  constructor(
    protected readonly mailerRepository: MailerRepository,
    // protected readonly eventEmitter: EventEmitter2,
    private readonly nestMailService: NestMailerService,
  ) {}
  private readonly templatePath = join(__dirname, './templates'); // folder to store templates

  async plainTextEmail(sendMailDto: ISendMailOptions) {
    const { to, from, subject, template, html, context, attachments } =
      sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      text: 'WElcome to nknJ',
    });
  }

  async hmtlEmail(sendMailDto: ISendMailOptions) {
    const { to, from, subject, template, html, context, attachments } =
      sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      template,
      html,
      context: {
        [context.template]: context.data,
      },
    });
  }

  async fileAttachment(sendMailDto: ISendMailOptions) {
    const { to, from, subject, template, html, context, attachments } =
      sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      html,
      template,
      context: {
        [context.template]: context.data,
      },
      // attachments:{
      //   path:'',
      //   filename:'',
      //   contentDisposition: 'attachment'
      // }
    });
  }

  // async sendMail({ data, mailOption }: any) {
  //   switch (mailOption.type) {
  //     case 'Plain':
  //       const res = await this.plainTextEmail(data);
  //       console.log(res);
  //       return res;
  //       break;

  //     case 'Html':
  //       return await this.plainTextEmail(data);
  //       break;
  //     case 'Attachment':
  //       return await this.plainTextEmail(data);
  //       break;

  //     default:
  //       return await this.plainTextEmail(data);
  //   }
  // }

  async find(query: any): Promise<Mailer> {
    try {
      return await this.mailerRepository.find(query);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Mailer[]> {
    try {
      return await this.mailerRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(createMailerData: any | CreateMailTemplateDto): Promise<Mailer> {
    const { name, type } = createMailerData;
    try {
      const existingMailer = await this.mailerRepository.exists({
        where: { AND: [{ name }, { type }] },
      });

      if (existingMailer) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'Mailer template already exists.',
        });
      }

      const newMailer = await this.mailerRepository.create({
        data: createMailerData,
      });

      return newMailer;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, data: UpdateMailTemplateDto) {
    Logger.debug(data);
    try {
      return await this.mailerRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateMailTemplateDto) {
    Logger.debug(data);
    try {
      return await this.mailerRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<Mailer> {
    try {
      return await this.mailerRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // Send email using a template and context
  async sendMail(sendMailDto: SendMailDto) {
    const { to, subject, template, context } = sendMailDto;

    // Check if the template exists
    if (!(await this.templateExists(template))) {
      throw new BadRequestException('Template not found');
    }

    // Send the email
    await this.sendMail({
      to,
      subject,
      template,
      context, // dynamic context for Handlebars
    });
  }

  // Save a new email template to the filesystem
  async saveTemplate(createHandlebarTemplateDto: CreateHandlebarTemplateDto) {
    const { name, template } = createHandlebarTemplateDto;
    const templateFile = this.getTemplatePath(name);

    // Save the template file
    await fs.writeFile(templateFile, template, 'utf-8');
  }

  // Retrieve a list of available templates
  async getTemplates() {
    return fs.readdir(this.templatePath);
  }

  // Retrieve a template by name
  async getTemplate(name: string) {
    const templateFile = this.getTemplatePath(name);

    if (await this.templateExists(name)) {
      return fs.readFile(templateFile, 'utf-8');
    }

    throw new BadRequestException('Template not found');
  }

  // Check if a template exists
  private async templateExists(name: string) {
    const templateFile = this.getTemplatePath(name);
    return fs.pathExists(templateFile);
  }

  // Utility to get the full path of a template file
  private getTemplatePath(name: string): string {
    return join(this.templatePath, `${name}.hbs`);
  }
}
