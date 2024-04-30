import { BaseModel } from './base.model';
import { OrderHistoryModel } from './orderHistory.model';
import { OrderItemModel } from './orderItem.model';
import { PaymentModel } from './payment.model';

export class OrderModel extends BaseModel {
  userId: number;
  storeId: number;
  deliveryLocation: number;
  deliveryStatus: string;
  orderReference: string;
  deliveryInstructions: string;
  subTotalPrice: number;
  paymentMethod?: string;
  estimatedDeliveryTime: string;
  feedback?: string;
  rating?: number;
  promoCode?: string;
  cancellationReason?: string;
  taxAmount?: string;
  deliveryFee?: string;
  timeslotId: number;
  orderHistory?: OrderHistoryModel[];
  orderItems?: OrderItemModel[];
  payments?: PaymentModel[];
}
