import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';

export class DeleteReviewUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async deleteReview(reviewId: string): Promise<IUseCaseResponse> {
    const review = await this.reviewRepository.deleteReview(reviewId);

    return {
      data: review,
    };
  }
}
