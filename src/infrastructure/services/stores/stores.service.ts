import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { stores } from '@prisma/client';
import { ServiceInterface } from 'src/domain/adapters';
import { IAuthUser } from 'src/infrastructure/common/decorators';
import { CreateStoreDto } from 'src/infrastructure/common/dto';
import { UpdateStoreDto } from 'src/infrastructure/common/dto/stores/updateStore.dto';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class StoreService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(StoreService.name);
  }

  async createStore(
    user: IAuthUser,
    dto: CreateStoreDto,
  ): Promise<ServiceInterface<stores>> {
    try {
      const store = await this.prisma.stores.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          name: dto.name,
          address: dto.address,
          phone: dto.phone,
          email: dto.email,
          instagramUrl: dto.instagramUrl,
          facebookUrl: dto.facebookUrl,
          xUrl: dto.xUrl,
          youtubeUrl: dto.youtubeUrl,
          description: dto.description,
          openingHours: dto.openingHours,
          deliveryRadius: dto.deliveryRadius,
          deliveryFee: dto.deliveryFee,
          minOrderAmountForDelivery: dto.minOrderAmountForDelivery,
          latitude: dto.latitude,
          longitude: dto.longitude,
        },
      });

      if (!store) {
        throw new InternalServerErrorException('Store could not be created');
      }

      if (!user.roles.includes('vendor')) {
        const updateUser = await this.prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            role: 'vendor',
          },
        });

        if (!updateUser) {
          this.logger.error('User role could not be updated');
        }
      }

      return {
        data: store,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStores(page: number = 1): Promise<ServiceInterface<stores[]>> {
    try {
      const stores = await this.prisma.stores.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!stores) {
        throw new InternalServerErrorException('Stores could not be retrieved');
      }

      return {
        data: stores,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllUserStores(
    userId: string,
    page: number = 1,
  ): Promise<ServiceInterface<stores[]>> {
    try {
      const userStores = await this.prisma.stores.findMany({
        where: {
          userId: userId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (userStores) {
        throw new InternalServerErrorException(
          'User stores could not be retrieved',
        );
      }

      return {
        data: userStores,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getStoreById(storeId: string): Promise<ServiceInterface<stores>> {
    try {
      const store = await this.prisma.stores.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new NotFoundException('Store not found');
      }

      return {
        data: store,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateStore(
    storeId: string,
    dto: UpdateStoreDto,
  ): Promise<ServiceInterface<stores>> {
    try {
      const updatedStore = await this.prisma.stores.update({
        where: {
          id: storeId,
        },
        data: dto,
      });

      if (!updatedStore) {
        throw new InternalServerErrorException('Store could not be updated');
      }

      return {
        data: updatedStore,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteStore(storeId: string): Promise<ServiceInterface<stores>> {
    try {
      const checkStoreOrders = await this.prisma.orders.findMany({
        where: {
          storeId: storeId,
          deliveryStatus: {
            in: ['confirmed', 'in_progress', 'placed'],
          },
        },
      });

      if (checkStoreOrders.length > 0) {
        throw new BadRequestException(
          'Ensure all orders are handled before deleting the store.',
        );
      }

      const checkTransactions = await this.prisma.transactions.findMany({
        where: {
          storeId: storeId,
          paymentStatus: {
            in: ['failed', 'pending'],
          },
        },
      });

      if (checkTransactions.length > 0) {
        throw new BadRequestException(
          'Please handle pending transactions befoe deleting the store',
        );
      }

      const store = await this.prisma.stores.delete({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new InternalServerErrorException('Store could not be deleted.');
      }

      return {
        data: store,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
