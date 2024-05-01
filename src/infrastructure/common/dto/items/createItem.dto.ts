import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  ingredients: string[];

  @IsNumber()
  @IsOptional()
  calories: number;

  @IsNumber()
  @IsOptional()
  fatContent: number;

  @IsNumber()
  @IsOptional()
  portionSize: string;

  @IsArray()
  allergens: string[];

  @IsArray()
  tags: string[];
}
