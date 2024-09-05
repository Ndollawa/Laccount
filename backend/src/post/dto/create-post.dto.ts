import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
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
  authorId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommentDto)
  @IsOptional()
  comments?: CreateCommentDto[];
}
