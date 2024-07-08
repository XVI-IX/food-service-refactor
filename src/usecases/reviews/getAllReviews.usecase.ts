import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class GetAllReviewsUseCase {
  constructor(private readonly reviewsRespository: ReviewRepository) {}

  async getAllReviews(): Promise<IUseCaseResponse> {
    const reviews = await this.reviewsRespository.getAllReviews();

    return {
      data: reviews,
    };
  }
}
