import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

export class ResetUserSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async resetUserSettings(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.resetUserSettings(userId);

    return {
      data: settings,
    };
  }
}
