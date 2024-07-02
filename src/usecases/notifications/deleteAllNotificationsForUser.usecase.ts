import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class DeleteAllNotificationsForUserUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async deleteAllNotificationsForUser(
    userId: string,
  ): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.deleteAllNotificationsForUser(userId);

    return {
      data: notifications,
    };
  }
}
