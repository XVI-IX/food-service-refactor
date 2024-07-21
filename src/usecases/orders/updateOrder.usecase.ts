import { IOrderRepository } from 'src/domain/repositories/order-repository.interface';
import { UpdateOrderDto } from 'src/infrastructure/common/dto';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async updateOrder(userId: string, orderId: string, dto: UpdateOrderDto) {
    const order = await this.orderRepository.updateOrder(orderId, dto, userId);

    return {
      data: order,
    };
  }
}
