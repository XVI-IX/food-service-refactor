import { UpdateCustomerDto } from 'src/infrastructure/common/dto';
import { IUserResponse } from './users.interface';

export interface ICustomerService {
  getAllCustomers(page?: number): Promise<IUserResponse>;
  getCustomerById(customerId: string): Promise<IUserResponse>;
  updateCustomer(
    customerId: string,
    dto: UpdateCustomerDto,
  ): Promise<IUserResponse>;
  deleteCustomer(customerId: string): Promise<IUserResponse>;
}
