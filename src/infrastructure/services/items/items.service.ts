import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ServiceInterface } from '../../../domain/adapters';
import { IItemsService } from '../../../domain/adapters';
import { CreateItemDto, UpdateItemDto } from '../../common/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

@Injectable()
export class ItemService implements IItemsService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsRepository: ItemsRepository,
  ) {
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
      const items = await this.itemsRepository.getAllItems(page);

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
      const items = await this.itemsRepository.getAllStoreItems(storeId, page);

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
      const item = await this.itemsRepository.getItemById(itemId);

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
      const updateItem = await this.itemsRepository.updateItemById(itemId, dto);

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
      const item = await this.itemsRepository.deleteItemById(itemId);

      return {
        data: item,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
