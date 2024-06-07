import { IsBoolean, IsString, IsTimeZone } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsBoolean()
  recieveEmailUpdates: boolean;

  @IsBoolean()
  recieveSMSUpdates: boolean;

  @IsBoolean()
  darkmode: boolean;

  @IsString()
  languagePreference: string;

  @IsTimeZone()
  timezone: string;
}
