import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class DeleteReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async deleteReview(reviewId: string): Promise<IUseCaseResponse> {
    const review = await this.reviewRepository.deleteReview(reviewId);

    return {
      data: review,
    };
  }
}
