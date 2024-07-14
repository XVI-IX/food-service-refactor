import { Injectable, Logger } from '@nestjs/common';
import {
  INotificationService,
  ServiceInterface,
} from '../../../domain/adapters';
import { CreateNotificationDto } from '../../common/dto';
import { NotificationRepository } from '../../repositories/notification.repository';

@Injectable()
export class NotificationService implements INotificationService {
  private logger: Logger;
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {
    this.logger = new Logger(NotificationService.name);
  }

  async getAllNotifications(): Promise<ServiceInterface> {
    try {
      const notifications =
        await this.notificationsRepository.getAllNotifications();

      return {
        data: notifications,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStoreNotifications(storeId: string): Promise<ServiceInterface> {
    try {
      const storeNotifications =
        await this.notificationsRepository.getAllStoreNotifications(storeId);

      return {
        data: storeNotifications,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllUserNotificatons(userId: string): Promise<ServiceInterface> {
    try {
      const userNotifications =
        await this.notificationsRepository.getAllUserNotifications(userId);

      return {
        data: userNotifications,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getNotificationById(notificationId: string): Promise<ServiceInterface> {
    try {
      const notification =
        await this.notificationsRepository.getNotificationById(notificationId);

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async markNotificationAsRead(
    notificationId: string,
  ): Promise<ServiceInterface> {
    try {
      const notification =
        await this.notificationsRepository.markNotificationAsRead(
          notificationId,
        );

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createNotificationForUser(
    userId: string,
    dto: CreateNotificationDto,
  ): Promise<ServiceInterface> {
    try {
      const notification =
        await this.notificationsRepository.createNotificationForUser(
          userId,
          dto,
        );

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createNotificationForStore(
    storeId: string,
    dto: CreateNotificationDto,
  ): Promise<ServiceInterface> {
    try {
      const notification =
        await this.notificationsRepository.createNotificationForStore(
          storeId,
          dto,
        );

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createNotificationsForAllUsers(
    dto: CreateNotificationDto,
  ): Promise<ServiceInterface> {
    try {
      const notifications =
        await this.notificationsRepository.createNotificationForAllUsers(dto);

      return {
        data: notifications,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteAllNotificationsForUser(
    userId: string,
  ): Promise<ServiceInterface> {
    try {
      const notifications = await this.deleteAllNotificationsForUser(userId);

      return {
        data: notifications,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteNotificationById(
    notificationId: string,
  ): Promise<ServiceInterface<any>> {
    try {
      const notification =
        await this.notificationsRepository.deleteNotificationById(
          notificationId,
        );

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
