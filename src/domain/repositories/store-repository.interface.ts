import { IAuthUser } from 'src/infrastructure/common/decorators';
import { CreateStoreDto, UpdateStoreDto } from 'src/infrastructure/common/dto';
import { StoreModel } from '../models/store.model';

export interface IStoreRepository {
  createStore(user: IAuthUser, dto: CreateStoreDto): Promise<StoreModel>;
  getAllStores(page?: number): Promise<StoreModel[]>;
  getAllUserStores(userId: string): Promise<StoreModel[]>;
  getStoreById(storeId: string): Promise<StoreModel>;
  updateStore(storeId: string, dto: UpdateStoreDto): Promise<StoreModel>;
  deleteStore(storeId: string): Promise<StoreModel>;
}
