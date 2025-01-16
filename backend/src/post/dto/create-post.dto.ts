import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { PublishStatus } from "@prisma/client";
import { Type } from 'class-transformer';
import { CreateCommentDto } from '../../comment/dto/create-comment.dto';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsString()
  @IsNotEmpty()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommentDto)
  comments?: CreateCommentDto[];
}
