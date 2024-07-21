import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ISettingsRepository } from 'src/domain/repositories/settings-repository.interface';

export class CreateUserSettingsUseCase {
  constructor(private readonly settingRepository: ISettingsRepository) {}

  async createUserSettings(userId: string): Promise<IUseCaseResponse> {
    const settings = await this.settingRepository.createUserSettings(userId);

    return {
      data: settings,
    };
  }
}
