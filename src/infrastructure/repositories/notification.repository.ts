import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { NotificationModel } from 'src/domain/models/notification.model';
import { CreateNotificationDto } from '../common/dto';

@Injectable()
export class NotificationRepository implements INotificationsRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(NotificationRepository.name);
  }

  async getAllNotifications(): Promise<NotificationModel[]> {
    try {
      const notifications = await this.prisma.notifications.findMany();

      if (!notifications) {
        throw new BadRequestException('Notifications could not be retrieved');
      }

      return notifications;
    } catch (error) {
      this.logger.error('Notifications could not be retrieved', error.stack);
      throw error;
    }
  }

  async getAllStoreNotifications(
    storeId: string,
  ): Promise<NotificationModel[]> {
    try {
      const storeNotifications = await this.prisma.notifications.findMany({
        where: {
          storeId: storeId,
        },
      });

      if (!storeNotifications) {
        throw new BadRequestException(
          'Store Notifications could not be retrieved',
        );
      }

      return storeNotifications;
    } catch (error) {
      this.logger.error(
        'Store notifications could not be retrieved',
        error.stack,
      );
      throw error;
    }
  }

  async getAllUserNotifications(userId: string): Promise<NotificationModel[]> {
    try {
      const userNotifications = await this.prisma.notifications.findMany({
        where: {
          userId: userId,
        },
      });

      if (!userNotifications) {
        throw new BadRequestException(
          'User notifications could not be retrieved',
        );
      }

      return userNotifications;
    } catch (error) {
      this.logger.error(
        'User notifications could not be retrieved',
        error.stack,
      );
      throw error;
    }
  }

  async getNotificationById(
    notificationId: string,
  ): Promise<NotificationModel> {
    try {
      const notification = await this.prisma.notifications.findUnique({
        where: {
          id: notificationId,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notification could not be retrieved');
      }

      return notification;
    } catch (error) {
      this.logger.error('Notification could not be retrieved', error.stack);
      throw error;
    }
  }

  async markNotificationAsRead(
    notificationId: string,
  ): Promise<NotificationModel> {
    try {
      const notification = await this.prisma.notifications.update({
        where: {
          id: notificationId,
        },
        data: {
          read: true,
        },
      });

      if (!notification) {
        throw new BadRequestException(
          'Notification could not be marked as read',
        );
      }

      return notification;
    } catch (error) {
      this.logger.error(
        'Notification could not be marked as read',
        error.stack,
      );
      throw error;
    }
  }

  async createNotificationForUser(
    userId: string,
    dto: CreateNotificationDto,
  ): Promise<NotificationModel> {
    try {
      const userExists = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        throw new NotFoundException('User not found');
      }
      const notification = await this.prisma.notifications.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          title: dto.title,
          description: dto.description,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notification could not be created');
      }

      return notification;
    } catch (error) {
      this.logger.error('User notification could not be created', error.stack);
      throw error;
    }
  }

  async createNotificationForStore(
    storeId: string,
    dto: CreateNotificationDto,
  ): Promise<NotificationModel> {
    try {
      const notification = await this.prisma.notifications.create({
        data: {
          title: dto.title,
          description: dto.description,
          store: {
            connect: {
              id: storeId,
            },
          },
        },
      });

      if (!notification) {
        throw new BadRequestException('Notification could not be created');
      }

      return notification;
    } catch (error) {
      this.logger.error(
        'Notification could not be created for store',
        error.stack,
      );
      throw error;
    }
  }

  async deleteAllNotificationsForUser(userId: string): Promise<boolean | null> {
    try {
      const notification = await this.prisma.notifications.deleteMany({
        where: {
          userId: userId,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notifications could not be deleted');
      }

      return true;
    } catch (error) {
      this.logger.error('Notifications could not be deleted', error.stack);
      throw error;
    }
  }

  async deleteNotificationById(
    notificationId: string,
  ): Promise<NotificationModel> {
    try {
      const notification = await this.prisma.notifications.delete({
        where: {
          id: notificationId,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notification could not be deleted');
      }

      return notification;
    } catch (error) {
      this.logger.error('Notification could not be deleted', error.stack);
      throw error;
    }
  }

  async createNotificationForAllUsers(
    dto: CreateNotificationDto,
  ): Promise<NotificationModel[]> {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          id: true,
        },
      });

      if (!users) {
        throw new BadRequestException('Users could not be retrieved');
      }

      const notificationsPromise = users.map(async (user) => {
        try {
          const notification = await this.prisma.notifications.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                },
              },
              title: dto.title,
              description: dto.description,
            },
          });

          return notification;
        } catch (error) {
          this.logger.error(
            `Notification could not be created for user with ${user.id}`,
          );
          return null;
        }
      });

      const notifications = await Promise.all(notificationsPromise);

      return notifications;
    } catch (error) {
      this.logger.error('Notifications created for all users', error.stack);
      throw error;
    }
  }
}
