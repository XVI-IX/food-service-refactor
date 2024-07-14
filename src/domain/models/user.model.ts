import { BaseModel } from './base.model';
import { OrderModel } from './order.model';
import { OrderHistoryModel } from './orderHistory.model';
import { StoreModel } from './store.model';

export class UserModel extends BaseModel {
  userName?: string;
  firstName?: string;
  otherName?: string;
  email?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  google_id?: string;
  role?: string;
  verified?: boolean;
  verificationToken?: string;
  resetToken?: string;
  status?: string;
  businessAddress?: string;
  recipientCode?: string;
  stores?: StoreModel[];
  latitude?: string;
  longitude?: string;
  orders?: OrderModel[];
  orderHistory?: OrderHistoryModel[];
  transactions?: any[];
  userSettings?: any[];
  notifications?: any[];
  reviews?: any[];
}
