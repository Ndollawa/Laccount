import { PartialType } from '@nestjs/mapped-types';
import { CreateAppSettingsDto } from './create-appsetting.dto';

export class UpdateAppSettingsDto extends PartialType(CreateAppSettingsDto) {}
