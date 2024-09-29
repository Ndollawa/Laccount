import { ActiveStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
