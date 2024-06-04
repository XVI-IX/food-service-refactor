import {
  CreateItemReviewDto,
  CreateStoreReviewDto,
} from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { IResponse } from './response.interface';

export interface IReviews extends IBase {
  content: string;
  rating?: number;
  reviewerId: string;
  storeId?: string;
  itemId?: string;
}

export interface IReviewsResponse extends IResponse {
  data?: IReviews | IReviews[] | null;
}

export interface IReviewsService {
  getAllReviews(): Promise<IReviewsResponse>;
  getReviewById(reviewId: string): Promise<IReviewsResponse>;
  getAllStoreReviews(storeId: string): Promise<IReviewsResponse>;
  getAllItemReviews(itemId: string): Promise<IReviewsResponse>;
  addStoreReview(
    storeId: string,
    dto: CreateStoreReviewDto,
    userId: string,
  ): Promise<IReviewsResponse>;
  addItemReview(
    itemId: string,
    dto: CreateItemReviewDto,
    userId: string,
  ): Promise<IReviewsResponse>;
  deleteReview(reviewId: string): Promise<IReviewsResponse>;
}
