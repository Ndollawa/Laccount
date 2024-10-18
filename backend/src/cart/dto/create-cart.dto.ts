import { IsNotEmpty, IsInt, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  listingId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateCartItemDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  listingId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
