import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { UpdateCustomerDto } from 'src/infrastructure/common/dto';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async updateCustomer(
    customerId: string,
    dto: UpdateCustomerDto,
  ): Promise<IUseCaseResponse> {
    const customer = await this.customerRepository.updateCustomer(
      customerId,
      dto,
    );

    return {
      data: customer,
    };
  }
}
