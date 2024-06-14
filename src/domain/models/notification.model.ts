import { BaseModel } from './base.model';

export class NotificationModel extends BaseModel {
  title: string;
  description: string;
  read: boolean;
}
