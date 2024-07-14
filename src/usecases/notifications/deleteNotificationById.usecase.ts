import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class DeleteNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async deleteNotificationById(
    notificationId: string,
  ): Promise<IUseCaseResponse> {
    const notification =
      await this.notificationRepository.deleteNotificationById(notificationId);

    return {
      data: notification,
    };
  }
}
