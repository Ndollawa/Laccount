import { IsString, IsUUID, IsOptional } from 'class-validator';

export class SettingFileUploadDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsUUID()
  id: string;
}
