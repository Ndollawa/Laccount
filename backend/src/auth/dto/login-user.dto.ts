import { IsNotEmpty, IsString, Matches, Min } from 'class-validator';
import { EMAIL_REGEX, USER_REGEX } from '@app/common';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX || EMAIL_REGEX, {
    message: 'Enter a valid username or email address.',
  })
  user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
