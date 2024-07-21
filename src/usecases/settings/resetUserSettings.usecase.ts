import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ISettingsRepository } from 'src/domain/repositories/settings-repository.interface';

export class ResetUserSettingsUseCase {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async resetUserSettings(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.resetUserSettings(userId);

    return {
      data: settings,
    };
  }
}
