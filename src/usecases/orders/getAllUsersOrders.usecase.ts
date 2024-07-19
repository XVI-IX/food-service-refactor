import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class GetAllUsersOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getAllUsersOrders(userId: string): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllUserOrders(userId);

    return {
      data: orders,
    };
  }
}
