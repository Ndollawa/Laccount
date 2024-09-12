import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ISendMailOptions, MailerService as NestMailerService } from '@nestjs-modules/mailer';
import * as grpc from '@grpc/grpc-js';
import { Mailer,WalletType } from '@prisma/client';
import { hashData, handleError } from '@app/common';
import { MailerRepository } from './mailer.repository';
import { CreateMailerDto, UpdateMailerDto } from './dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class MailerService {
  constructor(
    protected readonly mailerRepository: MailerRepository,
    protected readonly eventEmitter: EventEmitter2,
     private readonly nestMailService:NestMailerService
  ) {}

  async plainTextEmail(sendMailDto:ISendMailOptions) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      text: 'WElcome to nknJ',
      
    });
  }

  async hmtlEmail(sendMailDto:ISendMailOptions) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      template,
      html,
      context:{
        [context.template]: context.data
      },
      
    });
  }

  async fileAttachment(sendMailDto:ISendMailOptions) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.nestMailService.sendMail({
      to,
      from,
      subject,
      html,
      template,
      context:{
        [context.template]: context.data
      },
      // attachments:{
      //   path:'',
      //   filename:'',
      //   contentDisposition: 'attachment'
      // }
      
    });
  }

 async sendMail({data,mailOption}:any){
        switch(mailOption.type){
          case 'Plain':
         const res = await this.plainTextEmail(data);
         console.log(res)
         return res
          break;

          case 'Html':
         return await this.plainTextEmail(data);
          break;
          case 'Attachment':
         return await this.plainTextEmail(data);
          break;

          default:
            return await this.plainTextEmail(data)
        }
 }

  async findMailer(query: any): Promise<Mailer> {
    try {
      return await this.mailerRepository.find({
        where: query,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllMailers(query: any): Promise<Mailer[]> {
    try {
      return await this.mailerRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async createMailer(createMailerData: CreateMailerDto): Promise<Mailer> {
    const {name, type  } =  createMailerData;

    try {
      const existingMailer = await this.mailerRepository.exists({
        where: { AND: [{ name }, { type }] },
      });

      if (existingMailer) {
        throw new ConflictException({
          code: ALREADY_EXISTS,
          message: 'Mailer with credentials already exists.',
        });
      }


      const newMailer = await this.mailerRepository.create({
        data: createMailerData,
      });

      this.eventEmitter.emit('Mailer-created', newMailer);
      return newMailer;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async updateMailer(id: string, data: UpdateMailerDto) {
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

  async upsertMailer(id: string, data: UpdateMailerDto) {
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

  async removeMailer(id: string): Promise<Mailer> {
    try {
      return await this.mailerRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('Mailer-created')
  // sendVerificationEmail(payload: Mailer) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}

