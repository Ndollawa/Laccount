import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  score: number;

  @IsString()
  comment: string;

  @IsString()
  @IsUUID()
  orderId: string;

  @IsString()
  @IsUUID()
  sellerId: string;

  @IsString()
  @IsUUID()
  userId: string;
}
