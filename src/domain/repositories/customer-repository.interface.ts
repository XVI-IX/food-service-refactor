import { UpdateCustomerDto } from 'src/infrastructure/common/dto';
import { UserModel } from '../models/user.model';

export interface ICustomerRepository {
  getAllCustomers(): Promise<UserModel[] | null>;
  getCustomerById(customerId: string): Promise<UserModel>;
  updateCustomer(
    customerId: string,
    dto: UpdateCustomerDto,
  ): Promise<UserModel | null>;
  deleteCustomer(customerId: string): Promise<UserModel | null>;
}
