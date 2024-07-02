import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

export class GetAllCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getAllCustomers(): Promise<IUseCaseResponse> {
    const customers = await this.customerRepository.getAllCustomers();

    return {
      data: customers,
    };
  }
}
