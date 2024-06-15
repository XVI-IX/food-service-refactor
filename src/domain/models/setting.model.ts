import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export class SettingsModel extends BaseModel {
  user?: UserModel;
  userId?: string;
  recieveEmailUpdates?: boolean;
  recieveSMSUpdates?: boolean;
  darkmode?: boolean;
  languagePreference?: string;
  timezone?: string;
}
