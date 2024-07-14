import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { UpdateUserSettingsDto } from 'src/infrastructure/common/dto';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

export class UpdateUserSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

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
