import { BaseModel } from './base.model';
import { ItemModel } from './item.model';
import { PaymentModel } from './payment.model';

export class StoreModel extends BaseModel {
  userId?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  xUrl?: string;
  youtubeUrl?: string;
  description?: string;
  openingHours?: string;
  deliveryRadius?: string | number;
  deliveryFee?: number;
  minOrderAmountForDelivery?: number;
  latitude?: string;
  longitude?: string;
  active?: boolean;
  status?: string;
  avgRating?: number;
  totalReviews?: number;
  isOpen?: boolean;
  items?: ItemModel[];
  payments?: PaymentModel[];
}
