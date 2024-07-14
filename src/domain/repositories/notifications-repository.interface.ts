import { CreateNotificationDto } from 'src/infrastructure/common/dto';
import { NotificationModel } from '../models/notification.model';

export interface INotificationsRepository {
  getAllNotifications(): Promise<NotificationModel[]>;
  getAllStoreNotifications(storeId: string): Promise<NotificationModel[]>;
  getAllUserNotifications(userId: string): Promise<NotificationModel[]>;
  getNotificationById(notificationId: string): Promise<NotificationModel>;
  markNotificationAsRead(notificationId: string): Promise<NotificationModel>;
  createNotificationForUser(
    userId: string,
    dto: CreateNotificationDto,
  ): Promise<NotificationModel>;
  createNotificationForStore(
    storeId: string,
    dto: CreateNotificationDto,
  ): Promise<NotificationModel>;
  deleteAllNotificationsForUser(userId: string): Promise<boolean | null>;
  deleteNotificationById(
    notificationId: string,
  ): Promise<NotificationModel | null>;
  createNotificationForAllUsers(
    dto: CreateNotificationDto,
  ): Promise<NotificationModel[] | null>;
}
