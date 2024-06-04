import { CreateNotificationDto } from '../../infrastructure/common/dto';
import { IBase } from './base.interface';
import { ServiceInterface } from './service.interface';

export interface INotification extends IBase {
  title: string;
  description: string;
  read: boolean;
  userId?: string | null;
  storeId?: string | null;
}

export interface INotificationResponse {
  data?: INotification | INotification[] | null;
}

export interface INotificationService {
  getAllNotifications(): Promise<ServiceInterface<INotification[]>>;
  getNotificationById(
    notificationId: string,
  ): Promise<ServiceInterface<INotification>>;
  getAllUserNotificatons(
    userId: string,
  ): Promise<ServiceInterface<INotification[]>>;
  getAllStoreNotifications(
    storeId: string,
  ): Promise<ServiceInterface<INotification[]>>;
  markNotificationAsRead(
    notificationId: string,
  ): Promise<ServiceInterface<INotification>>;
  createNotificationForUser(
    userId: string,
    dto: CreateNotificationDto,
  ): Promise<ServiceInterface<INotification>>;
  createNotificationsForAllUsers(
    dto: CreateNotificationDto,
  ): Promise<ServiceInterface<INotification>>;
  deleteNotificationByIdForUser(
    userId: string,
  ): Promise<ServiceInterface<INotification>>;
  deleteAllNotificationsForUser(
    userId: string,
  ): Promise<ServiceInterface<INotification>>;
}
