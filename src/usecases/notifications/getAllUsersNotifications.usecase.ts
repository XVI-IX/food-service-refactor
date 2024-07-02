import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class GetAllUsersNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getAllUsersNotifications(userId: string): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllUserNotifications(userId);

    return {
      data: notifications,
    };
  }
}
