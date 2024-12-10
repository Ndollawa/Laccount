import { ActiveStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
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
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  tags: string[];

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
