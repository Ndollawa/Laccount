import { ViewState } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ViewState)
  @IsNotEmpty()
  state: ViewState;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  conversationId?: string;
}
