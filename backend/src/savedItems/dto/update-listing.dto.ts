import { PartialType } from '@nestjs/mapped-types';
import { CreateSavedItemDto } from './create-savedItem.dto';

export class UpdateSavedItemDto extends PartialType(CreateSavedItemDto) {}
