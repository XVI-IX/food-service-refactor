import { BaseModel } from './base.model';
import { OrderModel } from './order.model';
import { StoreModel } from './store.model';
import { UserModel } from './user.model';

export class TransactionModel extends BaseModel {
  user?: UserModel;
  userId?: string;
  description?: string;
  reference?: string;
  order?: OrderModel;
  orderId?: string;
  store?: StoreModel;
  storeId?: string;
  paymentStatus?: any;
  amount?: number;
  transactionType?: any;
  paymentDate?: Date;
  gatewayResponse?: any;
}
