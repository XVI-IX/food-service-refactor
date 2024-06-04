import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IReviewsResponse,
  IReviewsService,
} from '../../../domain/adapters/reviews.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ServiceInterface } from '../../../domain/adapters/service.interface';
import { CreateItemReviewDto } from '../../common/dto';

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

  async getReviewById(reviewId: string): Promise<IReviewsResponse> {
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
  ): Promise<IReviewsResponse> {
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
}
