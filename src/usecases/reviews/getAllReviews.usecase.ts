import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';

export class GetAllReviewsUseCase {
  constructor(private readonly reviewsRespository: IReviewRepository) {}

  async getAllReviews(): Promise<IUseCaseResponse> {
    const reviews = await this.reviewsRespository.getAllReviews();

    return {
      data: reviews,
    };
  }
}
