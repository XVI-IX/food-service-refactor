import { CreateOrderDto, UpdateOrderDto } from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { IOrderItems } from './orderItems.interface';
import { ServiceInterface } from './service.interface';

export interface IOrders extends IBase {
  userId: string;
  storeId: string;
  deliveryLocation: string;
  deliveryStatus: string;
  orderReference?: string;
  deliveryInstructions?: string;
  subTotalPrice: number;
  paymentMethod?: string;
  estimatedDeliveryTime?: string;
  feedback?: string;
  rating?: number;
  promoCode?: string;
  cancellationReason?: string;
  taxAmount?: string;
  deliveryFee?: string;
  timeslotId?: string;
  orderHistory?: any[]; // change to IOrderHistory
  orderItems?: IOrderItems[];
  transactions?: any[]; // Change to ITransactions
}

export interface IOrderResponse {
  status?: boolean;
  message?: string | null;
  data?: IOrders | IOrders[];
  page?: number;
}

export interface IOrderService {
  createOrder(userId: string, dto: CreateOrderDto): Promise<ServiceInterface>;
  getAllOrders(page?: number): Promise<ServiceInterface>;
  getAllUserOrders(userId: string, page?: number): Promise<ServiceInterface>;
  getAllStoreOrders(storeId: string, page?: number): Promise<ServiceInterface>;
  getOrderItems(orderId: string, page?: number): Promise<ServiceInterface>;
  getOrderById(orderId: string): Promise<ServiceInterface>;
  updateOrder(
    orderId: string,
    dto: UpdateOrderDto,
    userId: string,
  ): Promise<ServiceInterface>;
  cancelOrder(orderId: string, userId: string): Promise<ServiceInterface>;
  confirmOrder(orderId: string): Promise<ServiceInterface>;
}
