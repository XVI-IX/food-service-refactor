import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../auth';

export class UpdateCustomerDto extends CreateUserDto {
  @Exclude()
  password: string;
}
