import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserSettingsDto } from '../../common/dto';
import { HttpResponse } from '../../common/helpers/response.helper';
import { SettingsService } from '../../services/settings/settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsersSettings() {
    const response = await this.settingsService.getAllUserSettings();
    return HttpResponse.send('Settings retrieved', response);
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  async getUserSettingsById(@Param('userId') userId: string) {
    const response = await this.settingsService.getUserSettingsById(userId);
    return HttpResponse.send('User settings retrieved', response);
  }

  @Put('/:userId/update')
  @HttpCode(HttpStatus.OK)
  async updateUserSettings(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserSettingsDto,
  ) {
    const response = await this.settingsService.updateUserSettings(userId, dto);
    return HttpResponse.send('User settings updated', response);
  }

  @Put('/:userId/reset')
  @HttpCode(HttpStatus.OK)
  async resetUserSettings(@Param('userId') userId: string) {
    const response = await this.settingsService.resetUserSettings(userId);
    return HttpResponse.send('User Settings reset', response);
  }

  @Post('/:userId')
  @HttpCode(HttpStatus.OK)
  async createUserSettings(@Param('userId') userId: string) {
    const response = await this.settingsService.createUserSettings(userId);
    return HttpResponse.send('User Settings created', response);
  }
}
