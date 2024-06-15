import { Injectable, Logger } from '@nestjs/common';
import { ServiceInterface } from '../../../domain/adapters';
import { IStoreService } from '../../../domain/adapters/stores.interface';
import { IAuthUser } from '../../common/decorators';
import { CreateStoreDto } from '../../common/dto';
import { UpdateStoreDto } from '../../common/dto/stores/updateStore.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

@Injectable()
export class StoreService implements IStoreService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly storeRepository: StoreRepository,
  ) {
    this.logger = new Logger(StoreService.name);
  }

  async createStore(
    user: IAuthUser,
    dto: CreateStoreDto,
  ): Promise<ServiceInterface> {
    try {
      const store = await this.storeRepository.createStore(user, dto);

      return {
        data: store,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStores(page: number = 1): Promise<ServiceInterface> {
    try {
      const stores = await this.storeRepository.getAllStores(page);

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
  ): Promise<ServiceInterface> {
    try {
      const userStores = await this.storeRepository.getAllUserStores(
        userId,
        page,
      );

      return {
        data: userStores,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getStoreById(storeId: string): Promise<ServiceInterface> {
    try {
      const store = await this.storeRepository.getStoreById(storeId);

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
  ): Promise<ServiceInterface> {
    try {
      const updatedStore = await this.storeRepository.updateStore(storeId, dto);

      return {
        data: updatedStore,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteStore(storeId: string): Promise<ServiceInterface> {
    try {
      const store = await this.storeRepository.deleteStore(storeId);

      return {
        data: store,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
