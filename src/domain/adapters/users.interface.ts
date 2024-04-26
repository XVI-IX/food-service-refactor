import { IBase } from './base.interface';

export interface IUser extends IBase {
  user_name: string;
  email: string;
  phone_number: string;
  password: string;
  google_id: string;
  role: string;
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
  orders: any[];
}
