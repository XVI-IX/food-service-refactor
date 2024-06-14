import { BaseModel } from './base.model';

export class OrderItemModel extends BaseModel {
  orderId: string;
  itemId: string;
  quantity: number;
  totalItemPrice: number;
  price: number;
}
