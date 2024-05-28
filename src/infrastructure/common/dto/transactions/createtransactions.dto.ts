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
  orderId: string;

  @IsNumber()
  @IsOptional()
  storeId: string;

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
