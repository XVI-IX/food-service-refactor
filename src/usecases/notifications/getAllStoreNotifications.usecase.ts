import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class GetNotificationsForStoreUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotificationsForStore(storeId: string): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllStoreNotifications(storeId);

    return {
      data: notifications,
    };
  }
}
