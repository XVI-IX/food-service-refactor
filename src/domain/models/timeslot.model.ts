import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class TimeslotModel extends BaseModel {
  startTime: string;
  endTime: string;
  timezone: string;
  orderCount: number;
  currentCapacity: number;
  isAvailable: boolean;
  orders: OrderModel[];
}
