import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ServiceInterface } from '../../../domain/adapters';
import { ISettingsService } from '../../../domain/adapters/settings.interface';
import { UpdateUserSettingsDto } from '../../common/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SettingsRepository } from 'src/infrastructure/repositories/settings.repository';

@Injectable()
export class SettingsService implements ISettingsService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly settingsRepository: SettingsRepository,
  ) {
    this.logger = new Logger(SettingsService.name);
  }

  async getAllUserSettings(): Promise<ServiceInterface<any>> {
    try {
      const settings = await this.settingsRepository.getAllUserSettings();

      return {
        data: settings,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUserSettingsById(userId: string): Promise<ServiceInterface<any>> {
    try {
      const settings =
        await this.settingsRepository.getUserSettingsById(userId);

      return {
        data: settings,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateUserSettings(
    userId: string,
    dto: UpdateUserSettingsDto,
  ): Promise<ServiceInterface> {
    try {
      const updateSettings = await this.settingsRepository.updateUserSettings(
        userId,
        dto,
      );

      return {
        data: updateSettings,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createUserSettings(userId: string): Promise<ServiceInterface> {
    try {
      const settings = await this.settingsRepository.createUserSettings(userId);

      return {
        data: settings,
      };
    } catch (error) {}
  }

  async resetUserSettings(userId: string): Promise<ServiceInterface<any>> {
    try {
      const userSettings =
        await this.settingsRepository.resetUserSettings(userId);

      return {
        data: userSettings,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @OnEvent('UserRegisteration')
  async onUserRegistered(payload: any) {
    try {
      await this.createUserSettings(payload.userId);

      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
