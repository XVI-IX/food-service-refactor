import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICustomerRepository } from 'src/domain/repositories/customer-repository.interface';

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async deleteCustomer(customerId: string): Promise<IUseCaseResponse> {
    const customer = await this.customerRepository.deleteCustomer(customerId);

    return {
      data: customer,
    };
  }
}
