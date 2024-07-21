import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';

export class DeleteAllNotificationsForUserUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
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
