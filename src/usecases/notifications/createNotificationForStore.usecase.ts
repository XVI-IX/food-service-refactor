import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';

export class CreateNotificationForStoreUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotificationForStore(
    storeId: string,
    dto: CreateNotificationDto,
  ): Promise<IUseCaseResponse> {
    const notification =
      await this.notificationRepository.createNotificationForStore(
        storeId,
        dto,
      );

    return {
      data: notification,
    };
  }
}
