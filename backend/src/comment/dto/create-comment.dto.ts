import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
 @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
 @IsUUID()
  parentId?: string;
}
