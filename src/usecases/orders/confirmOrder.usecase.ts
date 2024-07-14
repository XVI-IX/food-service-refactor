import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class ConfirmOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async confirmOrder(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.confirmOrder(orderId);

    return {
      data: order,
    };
  }
}
