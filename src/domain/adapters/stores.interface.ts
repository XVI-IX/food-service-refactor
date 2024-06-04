import { IAuthUser } from 'src/infrastructure/common/decorators';
import { IBase } from './base.interface';
import { IItems } from './items.interface';
import { IOrders } from './orders.interface';
import { IResponse } from './response.interface';
import { CreateStoreDto, UpdateStoreDto } from 'src/infrastructure/common/dto';

export interface IStore extends IBase {
  userId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  instagramUrl?: string;
  facebookUrl?: string;
  xUrl?: string;
  youtubeUrl?: string;
  description: string;
  openingHours?: string;
  deliveryRadius?: number;
  deliveryFee?: number;
  minOrderAmountForDelivery?: number;
  latitude?: number;
  longitude?: number;
  active?: boolean;
  status: string;
  avgRating?: number;
  totalReviews?: number;
  isOpen?: boolean;
  items: IItems[];
  orders: IOrders[];
  transactions: any[];
}

export interface IStoreResponse extends IResponse {
  data?: IStore | IStore[];
}

export interface IStoreService {
  createStore(user: IAuthUser, dto: CreateStoreDto): Promise<IStoreResponse>;
  getAllStores(page?: number): Promise<IStoreResponse>;
  getAllUserStores(userId: string, page?: number): Promise<IStoreResponse>;
  getStoreById(storeId: string): Promise<IStoreResponse>;
  updateStore(storeId: string, dto: UpdateStoreDto): Promise<IStoreResponse>;
  deleteStore(storeId: string): Promise<IStoreResponse>;
  // getAllReviews(storeId: string): Promise<>;
}
