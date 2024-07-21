import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';
import { CreateOrderDto } from 'src/infrastructure/common/dto';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.createOrder(userId, dto);

    return {
      data: order,
    };
  }
}
