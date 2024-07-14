import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { StoreModel } from 'src/domain/models/store.model';
import { IAuthUser } from '../common/decorators';
import { CreateStoreDto, UpdateStoreDto } from '../common/dto';
import { envConfig } from '../config/environment.config';

@Injectable()
export class StoreRepository implements IStoreRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(StoreRepository.name);
  }

  async createStore(user: IAuthUser, dto: CreateStoreDto): Promise<StoreModel> {
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
        throw new BadRequestException('Store could not be created');
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

      return store;
    } catch (error) {
      this.logger.error('Store could not be created', error.stack);
      throw error;
    }
  }

  async getAllStores(page?: number): Promise<StoreModel[]> {
    try {
      const stores = await this.prisma.stores.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!stores) {
        throw new BadRequestException('Stores could not be retrieved');
      }

      return stores;
    } catch (error) {
      this.logger.error('All stores could not be retrieved', error.stack);
      throw error;
    }
  }

  async getAllUserStores(userId: string, page?: number): Promise<StoreModel[]> {
    try {
      const userStores = await this.prisma.stores.findMany({
        where: {
          userId: userId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (userStores) {
        throw new BadRequestException('User stores could not be retrieved');
      }

      return userStores;
    } catch (error) {
      this.logger.error("User's stores could not be retrieved", error.stack);
      throw error;
    }
  }

  async getStoreById(storeId: string): Promise<StoreModel> {
    try {
      const store = await this.prisma.stores.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new NotFoundException('Store not found');
      }

      return store;
    } catch (error) {
      this.logger.error('Store could not be retrieved', error.stack);
      throw error;
    }
  }

  async updateStore(storeId: string, dto: UpdateStoreDto): Promise<StoreModel> {
    try {
      const updatedStore = await this.prisma.stores.update({
        where: {
          id: storeId,
        },
        data: dto,
      });

      if (!updatedStore) {
        throw new BadRequestException('Store could not be updated');
      }

      return updatedStore;
    } catch (error) {
      this.logger.error('Store could not be updated', error.stack);
      throw error;
    }
  }

  async deleteStore(storeId: string): Promise<StoreModel> {
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
        throw new BadRequestException('Store could not be deleted.');
      }

      return store;
    } catch (error) {
      this.logger.error('Store could not be deleted', error.stack);
      throw error;
    }
  }
}
