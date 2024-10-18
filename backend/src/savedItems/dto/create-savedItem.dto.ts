import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSavedItemDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  listingId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
