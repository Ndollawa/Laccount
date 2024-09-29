import { NotificationType, ViewState } from '@prisma/client';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  notification: string;

  @IsDate()
  readAt: Date;

  @IsEnum(ViewState)
  status: ViewState;

  @IsString()
  @IsUUID()
  receiverId: string;
}
