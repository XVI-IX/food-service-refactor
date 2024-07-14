import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class GetAllItemReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getAllItemReviews(itemId: string): Promise<IUseCaseResponse> {
    const itemReviews = await this.reviewRepository.getAllItemReviews(itemId);

    return {
      data: itemReviews,
    };
  }
}
