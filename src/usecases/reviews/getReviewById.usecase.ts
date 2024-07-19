import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';

export class GetReviewByIdUseCase {
  constructor(private readonly reviewsRepository: IReviewRepository) {}

  async getReviewById(reviewId: string): Promise<IUseCaseResponse> {
    const review = await this.reviewsRepository.getReviewById(reviewId);

    return {
      data: review,
    };
  }
}
