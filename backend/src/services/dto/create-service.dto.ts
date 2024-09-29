import { PublishStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMimeType,
  IsArray,
  IsEnum,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsOptional()
  @IsMimeType()
  image: string;
}
