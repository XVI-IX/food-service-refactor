import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';
import { UseCaseProxy } from '../usecase-proxy';
import {
  GetAllUserSettingsUseCase,
  GetAllUserSettingsUseCaseProxy,
} from 'src/usecases/settings/getAllUserSettings.usecase';
import { GetUserSettingsByIdUseCase } from 'src/usecases/settings/getUserSettingsById.usecase';

export const SETTINGS_USECASE_PROXY = {
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
    'GetAllUserSettingsUseCaseProxy';
  static GET_USER_SETTINGS_BY_ID_USE_CASES_PROXY =
    'GetUserSettingsByIdUseCaseProxy';
  static UPDATE_USER_SETTINGS_USE_CASES_PROXY =
    'UpdateUserSettingsUseCaseProxy';
  static CREATE_USER_SETTINGS_USE_CASES_PROXY =
    'CreateUserSettingsUseCaseProxy';
  static RESET_USER_SETTINGS_USE_CASE_PROXY = 'ResetUserSettingsUseCaseProxy';

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
      ],
    };
  }
}
