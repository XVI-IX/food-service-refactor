import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ServiceInterface } from 'src/domain/adapters';
import { ISettingsService } from 'src/domain/adapters/settings.interface';
import { UpdateUserSettingsDto } from 'src/infrastructure/common/dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class SettingsService implements ISettingsService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(SettingsService.name);
  }

  async getAllUserSettings(): Promise<ServiceInterface<any>> {
    try {
      const settings = await this.prisma.userSettings.findMany();

      if (!settings) {
        throw new BadRequestException('Users settings could not be retrieved');
      }

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
      const settings = await this.prisma.userSettings.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!settings) {
        throw new BadRequestException('User settings could not be retrieved');
      }

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

      return {
        data: settings,
      };
    } catch (error) {}
  }

  async resetUserSettings(userId: string): Promise<ServiceInterface<any>> {
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
      const settings = await this.createUserSettings(payload.userId);

      if (!settings) {
        this.logger.error('User settings could not be created');
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
