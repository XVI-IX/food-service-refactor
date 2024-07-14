import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ISettingsRepository } from '../../domain/repositories/settings-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { SettingsModel } from 'src/domain/models/setting.model';
import { UpdateUserSettingsDto } from '../common/dto';

@Injectable()
export class SettingsRepository implements ISettingsRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(SettingsRepository.name);
  }

  async getAllUserSettings(): Promise<SettingsModel[]> {
    try {
      const settings = await this.prisma.userSettings.findMany();

      if (!settings) {
        throw new BadRequestException('Users settings could not be retrieved');
      }

      return settings;
    } catch (error) {
      this.logger.error('User settings could not be retrieved', error.stack);
      throw error;
    }
  }

  async getUserSettingsById(userId: string): Promise<SettingsModel> {
    try {
      const settings = await this.prisma.userSettings.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!settings) {
        throw new BadRequestException('User settings could not be retrieved');
      }

      return settings;
    } catch (error) {
      this.logger.error('User settings could not be retrieved', error.stack);
      throw error;
    }
  }

  async updateUserSettings(
    userId: string,
    dto: UpdateUserSettingsDto,
  ): Promise<SettingsModel> {
    try {
      const userExists = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        throw new NotFoundException('User with id not found');
      }

      const updateSettings = await this.prisma.userSettings.update({
        where: {
          userId: userId,
        },
        data: {
          recieveEmailUpdates: dto.recieveEmailUpdates,
          recieveSMSUpdates: dto.recieveSMSUpdates,
          languagePreference: dto.languagePreference,
          darkmode: dto.darkmode,
          timezone: dto.timezone,
        },
      });

      if (!updateSettings) {
        throw new BadRequestException('User settings could not be updated');
      }

      return updateSettings;
    } catch (error) {
      this.logger.error('User settings could not be retrived', error.stack);
      throw error;
    }
  }

  async createUserSettings(userId: string): Promise<SettingsModel> {
    try {
      const settings = await this.prisma.userSettings.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!settings) {
        throw new BadRequestException('User settings could not be created');
      }

      return settings;
    } catch (error) {
      this.logger.error('User settings could not be created', error.stack);
      throw error;
    }
  }

  async resetUserSettings(userId: string): Promise<SettingsModel> {
    try {
      const userSettings = await this.prisma.userSettings.update({
        where: {
          userId: userId,
        },
        data: {
          recieveEmailUpdates: true,
          recieveSMSUpdates: true,
          darkmode: false,
          languagePreference: 'en',
          timezone: 'UTC',
        },
      });

      if (!userSettings) {
        throw new BadRequestException('User settings could not be reset');
      }

      return userSettings;
    } catch (error) {
      this.logger.error('User settings could not be reset', error.stack);
      throw error;
    }
  }
}
