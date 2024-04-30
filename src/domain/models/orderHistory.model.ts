import { BaseModel } from './base.model';

export class OrderHistoryModel extends BaseModel {
  orderId: number;
  eventType: string;
  timestamp: string;
  actorId: number;
  details?: string;
}
