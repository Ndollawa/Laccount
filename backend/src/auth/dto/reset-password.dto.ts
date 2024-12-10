import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  Min,
} from 'class-validator';
import { EMAIL_REGEX, USER_REGEX } from '@app/common';
import { Match } from '@app/common/decorators';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX || EMAIL_REGEX, {
    message: 'Enter a valid username or email address.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
