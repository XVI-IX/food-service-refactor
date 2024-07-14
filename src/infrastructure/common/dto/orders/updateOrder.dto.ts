import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateOrderDto } from './createOrder.dto';
import { Exclude } from 'class-transformer';

export class UpdateOrderDto extends CreateOrderDto {
  @IsString()
  @IsOptional()
  details?: string;

  @Exclude()
  storeId?: string;

  @IsOptional()
  @IsString()
  deliveryLocation?: string;

  @IsOptional()
  @IsString()
  deliveryStatus?: any;

  @IsOptional()
  @IsString()
  deliveryInstructions?: string;

  @IsOptional()
  @IsNumber()
  subTotalPrice?: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  promoCode?: string;

  @IsOptional()
  @IsNumberString()
  deliveryFee?: string;

  @IsOptional()
  @IsNumber()
  timeslotId?: string;

  @IsOptional()
  @IsArray()
  orderItems?: any[];
}
