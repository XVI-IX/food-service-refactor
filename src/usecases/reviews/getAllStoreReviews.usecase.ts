import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class GetAllStoreReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getAllStoreReviews(storeId: string) {
    const storeReviews =
      await this.reviewRepository.getAllStoreReviews(storeId);

    return {
      data: storeReviews,
    };
  }
}
