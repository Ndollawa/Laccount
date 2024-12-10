import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { PWD_REGEX, USER_REGEX } from '@app/common';
import { isEqual } from 'date-fns';
import { Match } from '@app/common/decorators';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX, {
    message: `Invalid Username. Ensure that these requirements are met:\n
            Must be at least 3  characters. (and up to 100 characters)\n
            Must begin with  a letter\n`,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX, {
    message: `Invalid First Name. Ensure that these requirements are met:\n
            Must be at least 3  characters. (and up to 100 characters)\n
            Must begin with  a letter\n`,
  })
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX, {
    message: `Invalid Username. Ensure that these requirements are met:\n
            Must be at least 3  characters. (and up to 100 characters)\n
            Must begin with  a letter\n`,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail(
    {},
    {
      message: `Invalid email address. Ensure that these requirements are met:\n
                At least 10 characters (and up to 100 characters)\n
                Must begin with letter followed by @ and a provider. eg. youremail@provider.com\n
                Mustnend with a domain\n`,
    },
  )
  email: string;

  @IsNotEmpty()
  @Matches(PWD_REGEX, {
    message: `Weak Password. Ensure that these requirements are met:\n
             At least 8 characters (and up to 24 characters)\n
            Must include uppercase and lowercase letters\n
            Must include at least one special character, e.g.,- % $ ! @ # ?\n`,
  })
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
