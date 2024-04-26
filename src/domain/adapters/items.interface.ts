import { IBase } from './base.interface';

export interface IOrders extends IBase {
  customer_id: number;
  store_id: number;
  timeslot_id: number;
  placed_at: string;
  delivery_location: string;
  status: string;
  total_price: string;
  order_items: any[];
  vendor_id: number;
}
