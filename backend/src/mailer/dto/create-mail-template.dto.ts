import { MailerTemplateEnum, ActiveStatus } from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsObject,
  IsNotEmpty,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class CreateMailTemplateDto {
  @IsString()
  @IsNotEmpty()
  template: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  template: string;

  @IsNotEmpty()
  context: any; // context will hold variables for the Handlebars template
}

export class CreateEMailTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MailerTemplateEnum)
  type: MailerTemplateEnum;

  @IsNotEmpty()
  @IsUUID()
  templateId: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  @IsObject()
  context: any;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
