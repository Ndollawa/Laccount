import { ActiveStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contactId: string;

  // @IsEnum(ActiveStatus)
  // status: ActiveStatus;
}
