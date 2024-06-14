import { BaseModel } from './base.model';

export class ItemModel extends BaseModel {
  storeId?: string;
  name?: string;
  description?: string;
  price?: number;
  ingredients?: string[];
  calories?: number;
  fatContent?: number;
  portionSize?: string;
  allergens?: string[];
  tags?: string[];
}
