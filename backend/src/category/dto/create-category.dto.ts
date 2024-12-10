import { CategoryForEnum, ActiveStatus , CategoryIconType } from '@prisma/client';
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
  icon?: string;

  @IsOptional()
  @IsEnum(CategoryIconType)
  iconType?: CategoryIconType;

  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;

  @IsEnum(CategoryForEnum)
  for: CategoryForEnum;
}
