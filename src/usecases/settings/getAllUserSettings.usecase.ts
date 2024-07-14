import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

export class GetAllUserSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async getAllUserSettings(): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.getAllUserSettings();

    return {
      data: settings,
    };
  }
}
