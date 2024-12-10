import { GatewayMode } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentGatewayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsString()
  @IsNotEmpty()
  webhookSecret: string;

  @IsString()
  @IsNotEmpty()
  merchantId: string;

  @IsEnum(GatewayMode)
  @IsNotEmpty()
  mode: GatewayMode;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  supportedCurrencies: string[];

  @IsString()
  @IsNotEmpty()
  country: string;
}
