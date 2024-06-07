import { UpdateUserSettingsDto } from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { ServiceInterface } from './service.interface';

export interface ISetting extends IBase {
  userId: string;
  recieveEmailUpdates: boolean;
  recieveSMSUpdates: boolean;
  darkmode: boolean;
  languagePreference: string;
  timezone: string;
}

export interface ISettingsService {
  getAllUserSettings(): Promise<ServiceInterface>;
  getUserSettingsById(userId: string): Promise<ServiceInterface>;
  updateUserSettings(
    userId: string,
    dto: UpdateUserSettingsDto,
  ): Promise<ServiceInterface>;
  resetUserSettings(userId: string): Promise<ServiceInterface>;
  createUserSettings(userId: string): Promise<ServiceInterface>;
  onUserRegistered(payload: any);
}
