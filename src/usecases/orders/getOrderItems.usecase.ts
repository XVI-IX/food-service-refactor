import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class GetOrderItemsUseCaseProxy {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrderItems(orderId: string): Promise<IUseCaseResponse> {
    const orderItems = await this.orderRepository.getOrderItems(orderId);

    return {
      data: orderItems,
    };
  }
}
