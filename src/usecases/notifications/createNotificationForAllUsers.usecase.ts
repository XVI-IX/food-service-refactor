import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class CreateNotificationsForAllUsers {
  constructor(
    private readonly notificationRepository: NotificationRepository,
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
