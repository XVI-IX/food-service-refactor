import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class GetAllUsersOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllUsersOrders(userId: string): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllUserOrders(userId);

    return {
      data: orders,
    };
  }
}
