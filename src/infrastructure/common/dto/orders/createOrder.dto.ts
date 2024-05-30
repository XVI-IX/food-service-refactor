import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  storeId: string;

  @IsNotEmpty()
  @IsString()
  deliveryLocation: string;

  @IsNotEmpty()
  @IsString()
  deliveryStatus: any;

  @IsNotEmpty()
  @IsString()
  deliveryInstructions: string;

  @IsNotEmpty()
  @IsNumber()
  subTotalPrice: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  promoCode?: string;

  @IsNotEmpty()
  @IsNumberString()
  deliveryFee?: string;

  @IsNotEmpty()
  @IsNumber()
  timeslotId: string;
}
