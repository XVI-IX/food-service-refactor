import { BaseModel } from './base.model';

export class OrderItemModel extends BaseModel {
  orderId: number;
  itemId: number;
  quantity: number;
  totalItemPrice: number;
  price: number;
}
