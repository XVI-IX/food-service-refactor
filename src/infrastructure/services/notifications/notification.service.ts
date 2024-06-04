import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  INotificationService,
  ServiceInterface,
} from '../../../domain/adapters';
import { CreateNotificationDto } from '../../common/dto';

@Injectable()
export class NotificationService implements INotificationService {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(NotificationService.name);
  }

  async getAllNotifications(): Promise<ServiceInterface> {
    try {
      const notifications = await this.prisma.notifications.findMany();

      if (!notifications) {
        throw new BadRequestException('Notifications could not be retrieved');
      }

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
      const notification = await this.prisma.notifications.findUnique({
        where: {
          id: notificationId,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notification could not be retrieved');
      }

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

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // async createNotificationsForAllUsers(dto: CreateNotificationDto): Promise<ServiceInterface> {
  //   try {
  //     const users = await this.prisma.users.findMany({
  //       select: {
  //         id: true
  //       }
  //     });

  //     if (!users) {
  //       throw new BadRequestException('Users could not be retrieved')
  //     }

  //     // const notification = await this.prisma.notifications.createMany({
  //     // })
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  async deleteAllNotificationsForUser(
    userId: string,
  ): Promise<ServiceInterface> {
    try {
      const notification = await this.prisma.notifications.deleteMany({
        where: {
          userId: userId,
        },
      });

      if (!notification) {
        throw new BadRequestException('Notifications could not be deleted');
      }

      return {
        data: notification,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
