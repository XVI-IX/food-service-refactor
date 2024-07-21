import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';

export class GetAllItemReviewsUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async getAllItemReviews(itemId: string): Promise<IUseCaseResponse> {
    const itemReviews = await this.reviewRepository.getAllItemReviews(itemId);

    return {
      data: itemReviews,
    };
  }
}
