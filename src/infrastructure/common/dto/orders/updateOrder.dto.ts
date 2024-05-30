import { IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './createOrder.dto';
import { Exclude } from 'class-transformer';

export class UpdateOrderDto extends CreateOrderDto {
  @IsString()
  @IsOptional()
  details: string;

  @Exclude()
  storeId: string;
}
