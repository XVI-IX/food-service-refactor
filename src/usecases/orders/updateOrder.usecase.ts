import { UpdateOrderDto } from 'src/infrastructure/common/dto';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async updateOrder(orderId: string, dto: UpdateOrderDto) {
    const order = await this.orderRepository.updateOrder(orderId, dto);

    return {
      data: order,
    };
  }
}
