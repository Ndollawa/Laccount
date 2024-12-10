import { PublishStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsMimeType,
  IsUUID,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  creatorId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsOptional()
  @IsMimeType()
  image: string;
}
