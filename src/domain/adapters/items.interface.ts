import { CreateItemDto, UpdateItemDto } from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { IResponse } from './response.interface';

export interface IItems extends IBase {
  storeId: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  calories?: number;
  fatContent?: number;
  portionSize?: string;
  allergens: string[];
  tags: string[];
  orderItems: any[];
}

export interface IItemsResponse extends IResponse {
  data?: IItems | IItems[];
}

export interface IItemsService {
  addItemToStore(storeId: string, dto: CreateItemDto): Promise<IItemsResponse>;
  getAllItems(page?: number): Promise<IItemsResponse>;
  getAllStoreItems(storeId: string, page?: number): Promise<IItemsResponse>;
  getItemById(itemId: string): Promise<IItemsResponse>;
  updateItemById(itemId: string, dto: UpdateItemDto): Promise<IItemsResponse>;
  deleteItem(itemId: string): Promise<IItemsResponse>;
}
