import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { INotificationsRepository } from 'src/domain/repositories/notifications-repository.interface';
import { CreateNotificationDto } from 'src/infrastructure/common/dto';

export class CreateNotificationForStoreUseCase {
  constructor(
    private readonly notificationRepository: INotificationsRepository,
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
