import { ActiveStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;

  @IsString()
  bio: string;

  @IsOptional()
  @IsObject()
  socialMedia: {
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
  };

  @IsString()
  position: string;
}
