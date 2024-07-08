import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class GetAllStoreOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllStoreOrders(storeId: string): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllStoreOrders(storeId);

    return {
      data: orders,
    };
  }
}
