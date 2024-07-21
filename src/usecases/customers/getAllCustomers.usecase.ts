import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICustomerRepository } from 'src/domain/repositories/customer-repository.interface';

export class GetAllCustomersUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async getAllCustomers(): Promise<IUseCaseResponse> {
    const customers = await this.customerRepository.getAllCustomers();

    return {
      data: customers,
    };
  }
}
