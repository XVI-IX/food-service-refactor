import { BaseModel } from './base.model';
import { ItemModel } from './item.model';
import { PaymentModel } from './payment.model';

export class StoreModel extends BaseModel {
  userId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  instagramUrl?: string;
  facebookUrl?: string;
  xUrl?: string;
  youtubeUrl?: string;
  description?: string;
  openingHours?: string;
  deliveryRadius?: string;
  deliveryFee?: number;
  minOrderAmountForDelivery?: number;
  latitude?: number;
  longitude?: number;
  active?: boolean;
  status?: string;
  avgRating?: number;
  totalReviews?: number;
  isOpen?: number;
  items?: ItemModel[];
  payments?: PaymentModel[];
}
