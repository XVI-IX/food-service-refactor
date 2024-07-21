import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class ConfirmOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async confirmOrder(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.confirmOrder(orderId);

    return {
      data: order,
    };
  }
}
