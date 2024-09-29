import { PartialType } from '@nestjs/mapped-types';
import {
  CreateDashboardSettingsDto,
  CreateInfoSettingsDto,
  CreateLandingSettingsDto,
} from './create-appsetting.dto';

export class UpdateInfoSettingsDto extends PartialType(CreateInfoSettingsDto) {}

export class UpdateDashboardSettingsDto extends PartialType(
  CreateDashboardSettingsDto,
) {}

export class UpdateLandingSettingsDto extends PartialType(
  CreateLandingSettingsDto,
) {}

export type UpdateAppSettingsDto =
  | UpdateInfoSettingsDto
  | UpdateDashboardSettingsDto
  | UpdateLandingSettingsDto;
