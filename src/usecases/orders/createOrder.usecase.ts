import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateOrderDto } from 'src/infrastructure/common/dto';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

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
