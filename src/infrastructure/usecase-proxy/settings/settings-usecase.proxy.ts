import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { GetAllUserSettingsUseCase } from 'src/usecases/settings/getAllUserSettings.usecase';
import { GetUserSettingsByIdUseCase } from 'src/usecases/settings/getUserSettingsById.usecase';
import { CreateUserSettingsUseCase } from 'src/usecases/settings/createUserSettings.usecase';
import { ResetUserSettingsUseCase } from 'src/usecases/settings/resetUserSettings.usecase';
import { UpdateUserSettingsUseCase } from 'src/usecases/settings/updateUserSettings.usecase';

export const SETTINGS_USECASE_CONSTANTS = {
  GET_ALL_USER_SETTINGS: 'GET_ALL_USER_SETTINGS_USE_CASE_PROXY',
  GET_USER_SETTINGS_BY_ID: 'GET_USER_SETTINGS_BY_ID_USE_CASE_PROXY',
  UPDATE_USER_SETTINGS: 'UPDATE_USER_SETTINGS_USE_CASE_PROXY',
  CREATE_USER_SETTINGS: 'CREATE_USER_SETTINGS_USE_CASE_PROXY',
  RESET_USER_SETTINGS: 'RESET_USER_SETTINGS_USE_CASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class SettingsUseCaseProxyModule {
  static GET_ALL_USER_SETTINGS_USE_CASES_PROXY =
    'GET_ALL_USER_SETTINGS_USE_CASES_PROXY';
  static GET_USER_SETTINGS_BY_ID_USE_CASES_PROXY =
    'GET_USER_SETTINGS_BY_ID_USE_CASES_PROXY';
  static UPDATE_USER_SETTINGS_USE_CASES_PROXY =
    'UPDATE_USER_SETTINGS_USE_CASES_PROXY';
  static CREATE_USER_SETTINGS_USE_CASES_PROXY =
    'CREATE_USER_SETTINGS_USE_CASES_PROXY';
  static RESET_USER_SETTINGS_USE_CASE_PROXY =
    'RESET_USER_SETTINGS_USE_CASE_PROXY';

  static register() {
    return {
      module: SettingsUseCaseProxyModule,
      providers: [
        {
          inject: [SettingsRepository],
          provide:
            SettingsUseCaseProxyModule.GET_ALL_USER_SETTINGS_USE_CASES_PROXY,
          useFactory: (settingsRepository: SettingsRepository) =>
            new UseCaseProxy(new GetAllUserSettingsUseCase(settingsRepository)),
        },
        {
          inject: [SettingsRepository],
          provide:
            SettingsUseCaseProxyModule.GET_USER_SETTINGS_BY_ID_USE_CASES_PROXY,
          useFactory: (settingsRepository: SettingsRepository) =>
            new UseCaseProxy(
              new GetUserSettingsByIdUseCase(settingsRepository),
            ),
        },
        {
          inject: [SettingsRepository],
          provide:
            SettingsUseCaseProxyModule.CREATE_USER_SETTINGS_USE_CASES_PROXY,
          useFactory: (settingsRepository: SettingsRepository) =>
            new UseCaseProxy(new CreateUserSettingsUseCase(settingsRepository)),
        },
        {
          inject: [SettingsRepository],
          provide:
            SettingsUseCaseProxyModule.RESET_USER_SETTINGS_USE_CASE_PROXY,
          useFactory: (settingsRepository: SettingsRepository) =>
            new UseCaseProxy(new ResetUserSettingsUseCase(settingsRepository)),
        },
        {
          inject: [SettingsRepository],
          provide:
            SettingsUseCaseProxyModule.UPDATE_USER_SETTINGS_USE_CASES_PROXY,
          useFactory: (settingsRepository: SettingsRepository) =>
            new UseCaseProxy(new UpdateUserSettingsUseCase(settingsRepository)),
        },
      ],
      exports: [
        SettingsUseCaseProxyModule.GET_ALL_USER_SETTINGS_USE_CASES_PROXY,
        SettingsUseCaseProxyModule.GET_USER_SETTINGS_BY_ID_USE_CASES_PROXY,
        SettingsUseCaseProxyModule.UPDATE_USER_SETTINGS_USE_CASES_PROXY,
        SettingsUseCaseProxyModule.CREATE_USER_SETTINGS_USE_CASES_PROXY,
        SettingsUseCaseProxyModule.RESET_USER_SETTINGS_USE_CASE_PROXY,
      ],
    };
  }
}
