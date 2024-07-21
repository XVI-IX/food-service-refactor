import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getAllOrders(): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllOrders();

    return {
      data: orders,
    };
  }
}
