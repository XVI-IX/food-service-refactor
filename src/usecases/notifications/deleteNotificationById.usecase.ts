import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class DeleteNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
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
