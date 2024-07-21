import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class GetOrderByIdUseCaseProxy {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getOrderById(orderId: string): Promise<IUseCaseResponse> {
    const order = await this.orderRepository.getOrderById(orderId);

    return {
      data: order,
    };
  }
}
