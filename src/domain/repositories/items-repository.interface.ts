import { CreateItemDto } from 'src/infrastructure/common/dto';

export interface IItemsRepository {
  addItemToStore(storeId: string, dto: CreateItemDto): Promise;
}
