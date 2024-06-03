import { Exclude } from 'class-transformer';
import { CreateUserDto } from '../auth';

export class UpdateCustomerDto extends CreateUserDto {
  @Exclude()
  password: string;

  @Exclude()
  email: string;

  @Exclude()
  role: any;

  @Exclude()
  google_id?: string;

  @Exclude()
  businessAddress?: string;
}
