import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';

export class CreateNotificationsForAllUsers {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async createNotificationsForAllUsers(
    dto: CreateNotificationDto,
  ): Promise<IUseCaseResponse> {
    const notification =
      await this.notificationRepository.createNotificationForAllUsers(dto);

    return {
      data: notification,
    };
  }
}
