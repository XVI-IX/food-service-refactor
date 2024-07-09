import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class GetReviewByIdUseCase {
  constructor(private readonly reviewsRepository: ReviewRepository) {}

  async getReviewById(reviewId: string): Promise<IUseCaseResponse> {
    const review = await this.reviewsRepository.getReviewById(reviewId);

    return {
      data: review,
    };
  }
}
