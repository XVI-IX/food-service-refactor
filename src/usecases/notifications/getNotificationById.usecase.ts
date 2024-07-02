import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class GetNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotificationById(notificationId: string) {
    const notification =
      await this.notificationRepository.getNotificationById(notificationId);

    return {
      data: notification,
    };
  }
}
