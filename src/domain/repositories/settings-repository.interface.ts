import { UpdateUserSettingsDto } from 'src/infrastructure/common/dto';
import { SettingsModel } from '../models/setting.model';

export interface ISettingsRepository {
  getAllUserSettings(): Promise<SettingsModel[]>;
  getUserSettingsById(userId: string): Promise<SettingsModel>;
  updateUserSettings(
    userId: string,
    dto: UpdateUserSettingsDto,
  ): Promise<SettingsModel>;
  createUserSettings(userId: string): Promise<SettingsModel>;
  resetUserSettings(userId: string): Promise<SettingsModel>;
}
