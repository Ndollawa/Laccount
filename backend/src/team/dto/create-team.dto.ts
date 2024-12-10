import { ActiveStatus } from '@prisma/client';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsJSON,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  // @IsPhoneNumber()
  contact: string;

  @IsEmail()
  email: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;

  @IsString()
  bio: string;

  @IsOptional()
  // @IsObject()
  @IsJSON()
  socialMedia: {
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
  };

  @IsString()
  position: string;
}
