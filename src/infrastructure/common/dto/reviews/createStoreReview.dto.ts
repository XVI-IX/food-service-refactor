import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateStoreReviewDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
