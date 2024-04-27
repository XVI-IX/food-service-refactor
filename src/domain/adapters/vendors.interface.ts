import { IBase } from './base.interface';

export interface IVendors extends IBase {
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  business_address: string;
  verificationToken: string;
  verified: boolean;
  recipient_code?: string;
  role: string;
  stores: any[];
  orders: any[];
}