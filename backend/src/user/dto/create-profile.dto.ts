import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { USER_REGEX } from '@app/common';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  @Max(100)
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
  userId: string;

  @IsOptional()
  @IsString()
  middleName: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  bio: string;
  image: string;
}
