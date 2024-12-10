import { ActiveStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  response: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
