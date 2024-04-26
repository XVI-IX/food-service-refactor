import { IBase } from './base.interface';

export interface IStore extends IBase {
  name: string;
  vendor_id: number;
  address: string;
  description: string;
  image_url: string;
  active: string;
  status: string;
  admin_open: string;
  items: any[];
  orders: any[];
}
