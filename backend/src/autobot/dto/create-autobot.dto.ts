import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostDto } from '../../post/dto/create-post.dto';

export class CreateAutobotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostDto)
  @IsOptional()
  posts?: CreatePostDto[];
}
