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
  EMailTemplate,
  MailerTemplateEnum,
  ActiveStatus,
} from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { EMailTemplateRepository } from '../repositories/email-template.repository';
import {
  CreateEMailTemplateDto,
  UpdateEMailTemplateDto,
  SendMailDto,
} from '../dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class EMailTemplateService {
  constructor(
    protected readonly emailTemplateRepository: EMailTemplateRepository,
    // protected readonly eventEmitter: EventEmitter2,
    private readonly nestMailerService: NestMailerService,
  ) {}
  private readonly templatePath = join(__dirname, './templates'); // folder to store templates

  async plainTextEmail(sendMailDto: ISendMailOptions) {
    const { to, from, subject, template, html, context, attachments } =
      sendMailDto;
    return await this.nestMailerService.sendMail({
      to,
      from,
      subject,
      text: 'WElcome to nknJ',
    });
  }

  async hmtlEmail(sendMailDto: ISendMailOptions) {
    const { to, from, subject, template, html, context, attachments } =
      sendMailDto;
    return await this.nestMailerService.sendMail({
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
    return await this.nestMailerService.sendMail({
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

  async sendMail({ data, mailOption }: any) {
    switch (mailOption.type) {
      case 'Plain':
        const res = await this.plainTextEmail(data);
        console.log(res);
        return res;
        break;

      case 'Html':
        return await this.plainTextEmail(data);
        break;
      case 'Attachment':
        return await this.plainTextEmail(data);
        break;

      default:
        return await this.plainTextEmail(data);
    }
  }

  async find(query: any): Promise<EMailTemplate> {
    try {
      return await this.emailTemplateRepository.find(query);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<EMailTemplate[]> {
    try {
      return await this.emailTemplateRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    createEMailTemplateData: any | CreateEMailTemplateDto,
  ): Promise<EMailTemplate> {
    const { name, type } = createEMailTemplateData;
    try {
      const existingEMailTemplate = await this.emailTemplateRepository.exists({
        where: { AND: [{ name }, { type }] },
      });

      if (existingEMailTemplate) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'E-Mail Template template already exists.',
        });
      }

      const newEMailTemplate = await this.emailTemplateRepository.create({
        data: createEMailTemplateData,
      });

      return newEMailTemplate;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, data: UpdateEMailTemplateDto) {
    Logger.debug(data);
    try {
      return await this.emailTemplateRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateEMailTemplateDto) {
    Logger.debug(data);
    try {
      return await this.emailTemplateRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<EMailTemplate> {
    try {
      return await this.emailTemplateRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // Send email using a template and context
  // async sendMail(sendMailDto: SendMailDto) {
  //   const { to, subject, template, context } = sendMailDto;

  //   // Check if the template exists
  //   if (!(await this.templateExists(template))) {
  //     throw new BadRequestException('Template not found');
  //   }

  //   // Send the email
  //   await this.sendMail({
  //     to,
  //     subject,
  //     template,
  //     context, // dynamic context for Handlebars
  //   });
  // }
}
