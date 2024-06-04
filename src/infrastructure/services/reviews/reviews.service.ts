import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IReviewsService } from '../../../domain/adapters/reviews.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ServiceInterface } from '../../../domain/adapters/service.interface';
import { CreateItemReviewDto, CreateStoreReviewDto } from '../../common/dto';

@Injectable()
export class ReviewsService implements IReviewsService {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(ReviewsService.name);
  }

  async getAllReviews(): Promise<ServiceInterface> {
    try {
      const reviews = await this.prisma.reviews.findMany();

      if (!reviews) {
        throw new BadRequestException('Reviews could not be retrieved');
      }

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
      const itemReviews = await this.prisma.reviews.findMany({
        where: {
          itemId: itemId,
        },
      });

      if (!itemReviews) {
        throw new BadRequestException('Item reviews could not be retrieved');
      }

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
      const storeReviews = await this.prisma.reviews.findMany({
        where: {
          storeId: storeId,
        },
      });

      if (!storeReviews) {
        throw new BadRequestException('Store reviews could not be retrieved');
      }

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
      const review = this.prisma.reviews.delete({
        where: {
          id: reviewId,
        },
      });

      if (!review) {
        throw new BadRequestException('Review could not be deleted');
      }

      return {
        data: review,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
