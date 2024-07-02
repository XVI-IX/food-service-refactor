import { CreateNotificationDto } from 'src/infrastructure/common/dto';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class CreateNotificationForUserUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotificationForUser(userId: string, dto: CreateNotificationDto) {
    const notification =
      await this.notificationRepository.createNotificationForUser(userId, dto);

    return {
      data: notification,
    };
  }
}
