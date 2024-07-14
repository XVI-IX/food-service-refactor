import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

export class GetUserSettingsByIdUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async getUserSettingsById(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.getUserSettingsById(userId);

    return {
      data: settings,
    };
  }
}
