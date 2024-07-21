import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class MarkNotificationAsReadUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
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
