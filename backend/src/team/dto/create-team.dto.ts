import { ActiveStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsObject, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  phone: string;

  // @IsImage()
  image: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;

  @IsString()
  bio: string;

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
