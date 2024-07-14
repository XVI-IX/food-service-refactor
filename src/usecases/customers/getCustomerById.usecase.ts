import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCustomerById(customerId: string): Promise<IUseCaseResponse> {
    const customer = await this.customerRepository.getCustomerById(customerId);

    return {
      data: customer,
    };
  }
}
