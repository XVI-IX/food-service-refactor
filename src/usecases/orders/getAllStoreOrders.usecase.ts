import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';

export class GetAllStoreOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getAllStoreOrders(storeId: string): Promise<IUseCaseResponse> {
    const orders = await this.orderRepository.getAllStoreOrders(storeId);

    return {
      data: orders,
    };
  }
}
