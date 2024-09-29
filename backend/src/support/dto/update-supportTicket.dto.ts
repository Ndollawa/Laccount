import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportTicketDto } from './create-supportTicket.dto';

export class UpdateSupportTicketDto extends PartialType(
  CreateSupportTicketDto,
) {}
