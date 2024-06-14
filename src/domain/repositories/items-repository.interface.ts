import { CreateItemDto, UpdateItemDto } from 'src/infrastructure/common/dto';
import { ItemModel } from '../models/item.model';

export interface IItemsRepository {
  addItemToStore(storeId: string, dto: CreateItemDto): Promise<ItemModel>;
  getAllItems(page?: number): Promise<ItemModel[]>;
  getAllStoreItems(storeId: string, page?: number): Promise<ItemModel[]>;
  getItemById(itemId: string): Promise<ItemModel>;
  updateItemById(itemId: string, dto: UpdateItemDto): Promise<ItemModel>;
  deleteItemById(itemId: string): Promise<ItemModel>;
}
