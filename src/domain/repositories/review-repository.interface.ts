import {
  CreateItemReviewDto,
  CreateStoreReviewDto,
} from 'src/infrastructure/common/dto';
import { ReviewModel } from '../models/review.model';

export interface IReviewRepository {
  getAllReviews(): Promise<ReviewModel[]>;
  getReviewById(reviewId: string): Promise<ReviewModel>;
  addItemReview(
    itemId: string,
    dto: CreateItemReviewDto,
    userId: string,
  ): Promise<ReviewModel>;
  addStoreReview(
    storeId: string,
    dto: CreateStoreReviewDto,
    userId: string,
  ): Promise<ReviewModel>;
  getAllItemReviews(itemId: string): Promise<ReviewModel[]>;
  getAllStoreReviews(storeId: string): Promise<ReviewModel[]>;
  deleteReview(reviewId: string): Promise<ReviewModel>;
}
