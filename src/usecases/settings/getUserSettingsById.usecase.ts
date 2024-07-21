import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ISettingsRepository } from 'src/domain/repositories/settings-repository.interface';

export class GetUserSettingsByIdUseCase {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async getUserSettingsById(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingsRepository.getUserSettingsById(userId);

    return {
      data: settings,
    };
  }
}
