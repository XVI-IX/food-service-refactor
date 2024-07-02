import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async deleteCustomer(customerId: string): Promise<IUseCaseResponse> {
    const customer = await this.customerRepository.deleteCustomer(customerId);

    return {
      data: customer,
    };
  }
}
