import {
  IsDateString,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsOptional()
  reference: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  orderId: number;

  @IsNumber()
  @IsOptional()
  storeId: number;

  @IsString()
  paymentStatus: any;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @IsJSON()
  gatewayResponse: any;
}
