import { Injectable, Logger } from '@nestjs/common';
import { IReviewsService } from '../../../domain/adapters/reviews.interface';
import { ServiceInterface } from '../../../domain/adapters/service.interface';
import { CreateItemReviewDto, CreateStoreReviewDto } from '../../common/dto';
import { ReviewRepository } from '../../repositories/review.repository';

@Injectable()
export class ReviewsService implements IReviewsService {
  private logger: Logger;
  constructor(private readonly reviewRepository: ReviewRepository) {
    this.logger = new Logger(ReviewsService.name);
  }

  async getAllReviews(): Promise<ServiceInterface> {
    try {
      const reviews = await this.reviewRepository.getAllReviews();

      return {
        data: reviews,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getReviewById(reviewId: string): Promise<ServiceInterface> {
    try {
      const review = await this.reviewRepository.getReviewById(reviewId);

      return {
        data: review,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async addItemReview(
    itemId: string,
    dto: CreateItemReviewDto,
    userId: string,
  ): Promise<ServiceInterface> {
    try {
      const review = await this.reviewRepository.addItemReview(
        itemId,
        dto,
        userId,
      );

      return {
        data: review,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async addStoreReview(
    storeId: string,
    dto: CreateStoreReviewDto,
    userId: string,
  ): Promise<ServiceInterface> {
    try {
      const review = await this.reviewRepository.addStoreReview(
        storeId,
        dto,
        userId,
      );

      return {
        data: review,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllItemReviews(itemId: string): Promise<ServiceInterface> {
    try {
      const itemReviews = await this.reviewRepository.getAllItemReviews(itemId);

      return {
        data: itemReviews,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStoreReviews(storeId: string): Promise<ServiceInterface> {
    try {
      const storeReviews =
        await this.reviewRepository.getAllStoreReviews(storeId);

      return {
        data: storeReviews,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteReview(reviewId: string): Promise<ServiceInterface> {
    try {
      const review = await this.reviewRepository.deleteReview(reviewId);

      return {
        data: review,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
