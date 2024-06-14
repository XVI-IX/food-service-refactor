import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ItemModel } from 'src/domain/models/item.model';
import { CreateItemDto, UpdateItemDto } from '../common/dto';
import { envConfig } from '../config/environment.config';

@Injectable()
export class ItemsRepository implements IItemsRepository {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(ItemsRepository.name);
  }

  async addItemToStore(
    storeId: string,
    dto: CreateItemDto,
  ): Promise<ItemModel> {
    try {
      const item = await this.prisma.items.create({
        data: {
          store: {
            connect: {
              id: storeId,
            },
          },
          name: dto.name,
          description: dto.description,
          ingredients: dto.ingredients,
          allergens: dto.allergens,
          calories: dto.calories,
          fatContent: dto.fatContent,
          price: dto.price,
          portionSize: dto.portionSize,
          tags: dto.tags,
        },
      });

      if (!item) {
        throw new BadRequestException('Item could not be added to store');
      }

      return item;
    } catch (error) {
      this.logger.error('Item could not be added to store', error.stack);
      throw error;
    }
  }

  async getAllItems(page?: number): Promise<ItemModel[]> {
    try {
      const items = await this.prisma.items.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!items) {
        throw new BadRequestException('Items could not be retrieved');
      }

      return items;
    } catch (error) {
      this.logger.error('Items could not be retrieved', error.stack);
      throw error;
    }
  }

  async getAllStoreItems(storeId: string, page?: number): Promise<ItemModel[]> {
    try {
      const items = await this.prisma.items.findMany({
        where: {
          storeId: storeId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!items) {
        throw new BadRequestException('Items could not be retrieved');
      }

      return items;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getItemById(itemId: string): Promise<ItemModel> {
    try {
      const item = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      return item;
    } catch (error) {
      this.logger.error('Items could not be retrieved', error.stack);
      throw error;
    }
  }

  async updateItemById(itemId: string, dto: UpdateItemDto): Promise<ItemModel> {
    try {
      const checkItemExists = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!checkItemExists) {
        throw new NotFoundException('Item not found');
      }

      const item = await this.prisma.items.update({
        where: {
          id: itemId,
        },
        data: dto,
      });

      if (!item) {
        throw new BadRequestException('Item could not be updated');
      }

      return item;
    } catch (error) {
      this.logger.error('Item could not be updated', error.stack);
      throw error;
    }
  }

  async deleteItemById(itemId: string): Promise<ItemModel> {
    try {
      const checkItemExists = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!checkItemExists) {
        throw new NotFoundException('Item not found');
      }

      const item = await this.prisma.items.delete({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new BadRequestException('Item could not be deleted');
      }

      return item;
    } catch (error) {
      this.logger.error('Item could not be deleted', error.stack);
      throw error;
    }
  }
}
