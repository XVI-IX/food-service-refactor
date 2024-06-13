import { CreateItemDto } from 'src/infrastructure/common/dto';
import { ItemModel } from '../models/item.model';

export interface IItemsRepository {
  addItemToStore(storeId: string, dto: CreateItemDto): Promise<ItemModel>;
}
