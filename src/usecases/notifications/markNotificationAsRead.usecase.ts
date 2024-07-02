import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class MarkNotificationAsReadUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async markNotificationAsRead(
    notificationId: string,
  ): Promise<IUseCaseResponse> {
    const notification =
      await this.notificationRepository.markNotificationAsRead(notificationId);

    return {
      data: notification,
    };
  }
}
