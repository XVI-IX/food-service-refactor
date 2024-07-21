import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async cancelOrder(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.cancelOrder(orderId);

    return {
      data: order,
    };
  }
}
