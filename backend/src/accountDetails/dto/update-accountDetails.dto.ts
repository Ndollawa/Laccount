import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDetailsDto } from './create-accountDetails.dto';

export class UpdateAccountDetailsDto extends PartialType(
  CreateAccountDetailsDto,
) {}
