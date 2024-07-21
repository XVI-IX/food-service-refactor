import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICustomerRepository } from 'src/domain/repositories/customer-repository.interface';
import { UpdateCustomerDto } from 'src/infrastructure/common/dto';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

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
