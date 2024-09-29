import { Platform } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateAccountDetailsDto {
  @IsEnum(Platform)
  @IsNotEmpty()
  platform: Platform;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  followers: number;

  @IsNumber()
  @IsNotEmpty()
  engagementRate: number;

  @IsNumber()
  @IsNotEmpty()
  averageLikes: number;

  @IsNumber()
  @IsNotEmpty()
  averageComments: number;

  @IsString()
  bio: string;

  @IsString()
  @IsUrl()
  url: string;

  // @IsString()
}
