import { BaseModel } from './base.model';
import { OrderHistoryModel } from './orderHistory.model';
import { OrderItemModel } from './orderItem.model';
import { PaymentModel } from './payment.model';
import { UserModel } from './user.model';

export class OrderModel extends BaseModel {
  user?: UserModel;
  userId?: string;
  storeId?: string;
  deliveryLocation?: string;
  deliveryStatus?: string;
  orderReference?: string;
  deliveryInstructions?: string;
  subTotalPrice?: number;
  paymentMethod?: string;
  estimatedDeliveryTime?: Date;
  feedback?: string;
  rating?: number;
  promoCode?: string;
  cancellationReason?: string;
  taxAmount?: string;
  deliveryFee?: string;
  timeslotId?: string;
  orderHistory?: OrderHistoryModel[];
  orderItems?: OrderItemModel[];
  payments?: PaymentModel[];
}
