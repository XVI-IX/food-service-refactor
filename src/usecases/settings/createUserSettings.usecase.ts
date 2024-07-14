import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

export class CreateUserSettingsUseCase {
  constructor(private readonly settingRepository: SettingsRepository) {}

  async createUserSettings(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingRepository.createUserSettings(userId);

    return {
      data: settings,
    };
  }
}
