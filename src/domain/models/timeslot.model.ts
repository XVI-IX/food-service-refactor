import { BaseModel } from './base.model';
import { OrderModel } from './order.model';

export class TimeslotModel extends BaseModel {
  startTime: Date;
  endTime: Date;
  timezone: string;
  orderCount: number;
  currentCapacity: number;
  isAvailable: boolean;
  orders?: OrderModel[];
}
