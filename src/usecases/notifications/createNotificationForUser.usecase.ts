import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';

export class CreateNotificationForUserUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
  ) {}

  async createNotificationForUser(userId: string, dto: CreateNotificationDto) {
    const notification =
      await this.notificationRepository.createNotificationForUser(userId, dto);

    return {
      data: notification,
    };
  }
}
