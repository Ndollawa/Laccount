import { PartialType } from '@nestjs/mapped-types';
import { CreateMailTemplateDto } from './create-mailer.dto';

export class UpdateMailTemplateDto extends PartialType(CreateMailTemplateDto) {}
