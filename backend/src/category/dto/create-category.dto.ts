import { CategoryForEnum, PublishStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  targetId: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsString()
  targetType: string;
}
