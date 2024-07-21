import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';

export class GetAllStoreReviewsUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async getAllStoreReviews(storeId: string) {
    const storeReviews =
      await this.reviewRepository.getAllStoreReviews(storeId);

    return {
      data: storeReviews,
    };
  }
}
