import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';
import { CreateStoreReviewDto } from 'src/infrastructure/common/dto';

export class AddStoreReviewUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async addStoreReview(
    storeId: string,
    userId: string,
    dto: CreateStoreReviewDto,
  ) {
    const storeReview = await this.reviewRepository.addStoreReview(
      storeId,
      dto,
      userId,
    );

    return {
      data: storeReview,
    };
  }
}
