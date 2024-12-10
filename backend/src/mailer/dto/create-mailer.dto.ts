import {
  MailerTemplateEnum,
  ActiveStatus,
} from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsObject,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateHandlebarTemplateDto {
  @IsString()
  @IsNotEmpty()
  template: string;

  @IsString()
  @IsNotEmpty()
  name: string;
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

export class CreateMailTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(MailerTemplateEnum)
  type: MailerTemplateEnum;

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
