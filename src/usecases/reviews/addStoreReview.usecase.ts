import { CreateStoreDto } from 'src/infrastructure/common/dto';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class AddStoreReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async addStoreReview(storeId: string, userId: string, dto: CreateStoreDto) {
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
