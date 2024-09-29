import { MailerTemplateStatus, MailerTemplateEnum } from '@prisma/client';
import { IsEnum, IsString, IsObject, IsNotEmpty } from 'class-validator';

export class CreateMailerDto {
  @IsString()
  @IsNotEmpty()
  template: string;

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
  data: any;

  @IsEnum(MailerTemplateStatus)
  status: MailerTemplateStatus;
}
