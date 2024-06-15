import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewModel } from '../../domain/models/review.model';
import { CreateItemReviewDto, CreateStoreReviewDto } from '../common/dto';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(ReviewRepository.name);
  }

  async getAllReviews(): Promise<ReviewModel[]> {
    try {
      const reviews = await this.prisma.reviews.findMany();

      if (!reviews) {
        throw new BadRequestException('Reviews could not be retrieved');
      }

      return reviews;
    } catch (error) {
      this.logger.error('Reviews could not be retrieved', error.stack);
      throw error;
    }
  }

  async getReviewById(reviewId: string): Promise<ReviewModel> {
    try {
      const review = await this.prisma.reviews.findUnique({
        where: {
          id: reviewId,
        },
      });

      if (!review) {
        throw new BadRequestException(
          `Review with id ${reviewId} could not be retrieved`,
        );
      }

      return review;
    } catch (error) {
      this.logger.error('Review could not be retrieved', error.stack);
      throw error;
    }
  }

  async addItemReview(
    itemId: string,
    dto: CreateItemReviewDto,
    userId: string,
  ): Promise<ReviewModel> {
    try {
      const itemExists = await this.prisma.items.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!itemExists) {
        throw new NotFoundException('Item could not be found');
      }

      const review = await this.prisma.reviews.create({
        data: {
          item: {
            connect: {
              id: itemId,
            },
          },
          content: dto.content,
          rating: dto.rating,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!review) {
        throw new BadRequestException('Review could not be added to item');
      }

      return review;
    } catch (error) {
      this.logger.error('Review could not be added to item', error.stack);
      throw error;
    }
  }

  async addStoreReview(
    storeId: string,
    dto: CreateStoreReviewDto,
    userId: string,
  ): Promise<ReviewModel> {
    try {
      const review = await this.prisma.reviews.create({
        data: {
          store: {
            connect: {
              id: storeId,
            },
          },
          content: dto.content,
          rating: dto.rating,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      if (!review) {
        throw new BadRequestException('Store review could not be created');
      }

      return review;
    } catch (error) {
      this.logger.error('Review could not be added to store', error.stack);
      throw error;
    }
  }

  async getAllItemReviews(itemId: string): Promise<ReviewModel[]> {
    try {
      const itemReviews = await this.prisma.reviews.findMany({
        where: {
          itemId: itemId,
        },
      });

      if (!itemReviews) {
        throw new BadRequestException('Item reviews could not be retrieved');
      }

      return itemReviews;
    } catch (error) {
      this.logger.error('Item reviews could not be retrieved', error.stack);
      throw error;
    }
  }

  async getAllStoreReviews(storeId: string): Promise<ReviewModel[]> {
    try {
      const storeReviews = await this.prisma.reviews.findMany({
        where: {
          storeId: storeId,
        },
      });

      if (!storeReviews) {
        throw new BadRequestException('Store reviews could not be retrieved');
      }

      return storeReviews;
    } catch (error) {
      this.logger.error('Store reviews could not be retrieved', error.stack);
      throw error;
    }
  }

  async deleteReview(reviewId: string): Promise<ReviewModel> {
    try {
      const review = this.prisma.reviews.delete({
        where: {
          id: reviewId,
        },
      });

      if (!review) {
        throw new BadRequestException('Review could not be deleted');
      }

      return review;
    } catch (error) {
      this.logger.error('Review could not be deleted', error.stack);
      throw error;
    }
  }
}
