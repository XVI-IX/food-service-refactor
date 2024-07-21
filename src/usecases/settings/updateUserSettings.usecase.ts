import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ISettingsRepository } from 'src/domain/repositories/settings-repository.interface';
import { UpdateUserSettingsDto } from 'src/infrastructure/common/dto';

export class UpdateUserSettingsUseCase {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async updateUserSettings(
    userId: string,
    dto: UpdateUserSettingsDto,
  ): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.updateUserSettings(
      userId,
      dto,
    );

    return {
      data: settings,
    };
  }
}
