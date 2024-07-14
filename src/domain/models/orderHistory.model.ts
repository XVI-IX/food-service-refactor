import { BaseModel } from './base.model';

export class OrderHistoryModel extends BaseModel {
  orderId: string;
  eventType: string;
  timestamp: Date | null;
  actorId: string;
  details?: string;
}
