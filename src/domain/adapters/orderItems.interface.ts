import { IBase } from './base.interface';
import { IResponse } from './response.interface';

export interface IOrderItems extends IBase {
  orderId: string;
  itemId: string;
  quantity: number;
  totalItemPrice?: number;
  price?: number;
}

export interface IOrderItemsResponse extends IResponse {
  data?: IOrderItems | IOrderItems[];
}

// export interface IOrderItemsService {

// }
