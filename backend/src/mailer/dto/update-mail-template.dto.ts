import { PartialType } from '@nestjs/mapped-types';
import { CreateMailTemplateDto, CreateEMailTemplateDto } from './';

export class UpdateMailTemplateDto extends PartialType(CreateMailTemplateDto) {}
export class UpdateEMailTemplateDto extends PartialType(
  CreateEMailTemplateDto,
) {}
