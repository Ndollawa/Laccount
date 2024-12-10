import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateAccountDetailsDto {
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  followers: number;

  @IsNumber()
  @IsNotEmpty()
  engagementRate: number;

  @IsNumber()
  @IsNotEmpty()
  averageLikes: number;

  @IsNumber()
  @IsNotEmpty()
  averageComments: number;

  @IsString()
  bio: string;

  @IsString()
  @IsUrl()
  url: string;

  // @IsString()
}
