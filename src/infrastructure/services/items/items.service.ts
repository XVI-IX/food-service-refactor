import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ServiceInterface } from 'src/domain/adapters';
import { IItemsService } from 'src/domain/adapters/items.interface';
import { CreateItemDto, UpdateItemDto } from 'src/infrastructure/common/dto';
import { envConfig } from 'src/infrastructure/config/environment.config';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ItemService implements IItemsService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(ItemService.name);
  }

  /**
   * Add a new item to the a store.
   *
   * @param storeId ID of store offering the item being stored
   * @param dto data representing data to be stored
   * @returns {Promise<ServiceInterface>}
   */
  async addItemToStore(
    storeId: string,
    dto: CreateItemDto,
  ): Promise<ServiceInterface> {
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
        throw new InternalServerErrorException(
          'Item could not be added to store',
        );
      }

      return { data: item };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Get all items being offered on the service
   *
   * @param page number representing the current page for pagination
   * @returns {Promise<ServiceInterface>}
   */
  async getAllItems(page: number = 1): Promise<ServiceInterface> {
    try {
      const items = await this.prisma.items.findMany({
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!items) {
        throw new InternalServerErrorException('Items could not be retrieved');
      }

      return {
        data: items,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Get all items a store offers
   *
   * @param storeId Unique identifier for the store.
   * @param page Current page pointer for pagination
   * @returns {Promise<ServiceInterface>}
   */
  async getAllStoreItems(
    storeId: string,
    page: number = 1,
  ): Promise<ServiceInterface> {
    try {
      const items = await this.prisma.items.findMany({
        where: {
          storeId: storeId,
        },
        skip: (page - 1) * envConfig.getPaginationLimit(),
        take: envConfig.getPaginationLimit(),
      });

      if (!items) {
        throw new InternalServerErrorException('Items could not be retrieved');
      }

      return {
        data: items,
        page,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Get an item by it's id
   *
   * @param itemId Unique identifier for item to be retrieved
   * @returns {Promise<ServiceInterface>}
   */
  async getItemById(itemId: string): Promise<ServiceInterface> {
    try {
      const item = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      return {
        data: item,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Updates an item
   *
   * @param itemId Item's unique ID
   * @param dto data to update item with
   * @returns {Promise<ServiceInterface>}
   */
  async updateItemById(
    itemId: string,
    dto: UpdateItemDto,
  ): Promise<ServiceInterface> {
    try {
      const checkItemExists = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!checkItemExists) {
        throw new NotFoundException('Item not found');
      }

      const updateItem = await this.prisma.items.update({
        where: {
          id: itemId,
        },
        data: dto,
      });

      if (!updateItem) {
        throw new InternalServerErrorException('Item could not be updated');
      }

      return {
        data: updateItem,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteItem(itemId: string): Promise<ServiceInterface> {
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
        throw new InternalServerErrorException('Item could not be deleted');
      }

      return {
        data: item,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
