import { BaseModel } from './base.model';
import { ItemModel } from './item.model';
import { StoreModel } from './store.model';
import { UserModel } from './user.model';

export class ReviewModel extends BaseModel {
  content?: string;
  rating?: number;
  user?: UserModel;
  reviewerId?: string;
  store?: StoreModel;
  storeId?: string;
  item?: ItemModel;
  itemId?: string;
}
