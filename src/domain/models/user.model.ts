import { BaseModel } from './base.model';
import { StoreModel } from './store.model';

export class UserModel extends BaseModel {
  userName?: string;
  firstName?: string;
  otherName?: string;
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
}
