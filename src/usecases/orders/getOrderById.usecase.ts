import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class GetOrderByIdUseCaseProxy {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrderById(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.getOrderById(orderId);

    return {
      data: order,
    };
  }
}
