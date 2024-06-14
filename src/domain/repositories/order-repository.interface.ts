import { CreateOrderDto, UpdateOrderDto } from 'src/infrastructure/common/dto';
import { OrderModel } from '../models/order.model';
import { OrderHistoryModel } from '../models/orderHistory.model';
import { OrderEventTypeEnum } from '@prisma/client';
import { ItemModel } from '../models/item.model';
import { OrderItemModel } from '../models/orderItem.model';

export interface IOrderRepository {
  createOrder(userId: string, dto: CreateOrderDto): Promise<OrderModel>;
  getAllOrders(page?: number): Promise<OrderModel[]>;
  getAllUserOrders(userId: string, page?: number): Promise<OrderModel[]>;
  getAllStoreOrders(storeId: string, page?: number): Promise<OrderModel[]>;
  getOrderById(orderId: string): Promise<OrderModel>;
  updateOrder(
    orderId: string,
    dto: UpdateOrderDto,
    userId: string,
  ): Promise<OrderModel>;
  confirmOrder(orderId: string): Promise<OrderModel>;
  cancelOrder(orderId: string): Promise<OrderModel>;
  addOrderHistory(
    orderId: string,
    eventType: OrderEventTypeEnum,
    userId: string,
  ): Promise<OrderHistoryModel>;
  failedOrder(orderId: string): Promise<OrderModel>;
  addOrderItems(
    storeId: string,
    items: OrderItemModel[],
    orderId: string,
  ): Promise<OrderModel>;
}
