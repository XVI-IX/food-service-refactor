import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class GetNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async getNotificationById(notificationId: string): Promise<IUseCaseResponse> {
    const notification =
      await this.notificationRepository.getNotificationById(notificationId);

    return {
      data: notification,
    };
  }
}
