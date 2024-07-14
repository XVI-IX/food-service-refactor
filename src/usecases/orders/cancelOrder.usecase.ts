import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async cancelOrder(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.cancelOrder(orderId);

    return {
      data: order,
    };
  }
}
