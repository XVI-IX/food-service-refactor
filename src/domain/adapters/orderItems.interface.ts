import { IBase } from './base.interface';

export interface IOrderItems extends IBase {
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
}
