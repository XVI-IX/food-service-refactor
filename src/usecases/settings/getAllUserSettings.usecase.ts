import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ISettingsRepository } from 'src/domain/repositories/settings-repository.interface';

export class GetAllUserSettingsUseCase {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async getAllUserSettings(): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.getAllUserSettings();

    return {
      data: settings,
    };
  }
}
