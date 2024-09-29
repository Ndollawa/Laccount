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

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  parentId: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsEnum(CategoryForEnum)
  for: CategoryForEnum;
}
