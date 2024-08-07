import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
} from 'class-validator';

export class CreateTimeslotDto {
  @IsString()
  @IsNotEmpty()
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  endTime: Date;

  @IsString()
  @IsTimeZone()
  @IsNotEmpty()
  timezone?: string;

  @IsOptional()
  @IsNumber()
  orderCount?: number;

  @IsOptional()
  @IsNumber()
  currentCapacity?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
