import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class GetNotificationsForStoreUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async getNotificationsForStore(storeId: string): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllStoreNotifications(storeId);

    return {
      data: notifications,
    };
  }
}
