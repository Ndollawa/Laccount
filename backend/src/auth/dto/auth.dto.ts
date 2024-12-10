import { IsEmail, IsString } from 'class-validator';

export class VerifyUserEmailDto {
  @IsString()
  otp: string;

  @IsString()
  token: string;

  @IsString()
  @IsEmail()
  email: string;
}
