import { IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './createOrder.dto';

export class UpdateOrderDto extends CreateOrderDto {
  @IsString()
  @IsOptional()
  details: string;
}
