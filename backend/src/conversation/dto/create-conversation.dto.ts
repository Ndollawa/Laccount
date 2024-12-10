import { ActiveStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  members: string[];

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
