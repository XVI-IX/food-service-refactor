import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class GetOrderItemsUseCaseProxy {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getOrderItems(orderId: string): Promise<IUseCaseResponse> {
    const orderItems = await this.orderRepository.getOrderItems(orderId);

    return {
      data: orderItems,
    };
  }
}
