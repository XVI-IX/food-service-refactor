import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class GetAllUsersNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async getAllUsersNotifications(userId: string): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllUserNotifications(userId);

    return {
      data: notifications,
    };
  }
}
