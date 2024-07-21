import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class GetAllNotificationsUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async getAllNotifications(): Promise<IUseCaseResponse> {
    const notifications =
      await this.notificationRepository.getAllNotifications();

    return {
      data: notifications,
    };
  }
}
