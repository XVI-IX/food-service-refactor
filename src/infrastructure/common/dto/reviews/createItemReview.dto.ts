import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateItemReviewDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
