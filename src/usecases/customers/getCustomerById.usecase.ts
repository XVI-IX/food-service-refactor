import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICustomerRepository } from 'src/domain/repositories/customer-repository.interface';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async getCustomerById(customerId: string): Promise<IUseCaseResponse> {
    const customer = await this.customerRepository.getCustomerById(customerId);

    return {
      data: customer,
    };
  }
}
