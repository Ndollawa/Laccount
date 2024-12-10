import { WalletType, WalletStatus } from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateWalletDto {
  @IsEnum(WalletType)
  type: WalletType;

  @IsEnum(WalletStatus)
  status: WalletStatus;

  @IsDecimal()
  balance: number;

  @IsObject()
  @IsOptional()
  currency: object;

  @IsString()
  @IsUUID()
  userId: string;
}
