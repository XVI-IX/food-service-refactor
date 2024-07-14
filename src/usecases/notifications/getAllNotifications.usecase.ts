import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class GetAllNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getAllNotifications(): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllNotifications();

    return {
      data: notifications,
    };
  }
}
