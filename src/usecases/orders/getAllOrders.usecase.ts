import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllOrders(): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllOrders();

    return {
      data: orders,
    };
  }
}
