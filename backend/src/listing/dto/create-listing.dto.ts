import { ListingStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateListingDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsEnum(ListingStatus)
  @IsNotEmpty()
  listingStatus: ListingStatus;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
