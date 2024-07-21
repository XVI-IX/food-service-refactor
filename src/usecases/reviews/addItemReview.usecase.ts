import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IReviewRepository } from 'src/domain/repositories/review-repository.interface';
import { CreateItemReviewDto } from 'src/infrastructure/common/dto';

export class AddItemReviewUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async addItemReview(
    itemId: string,
    userId: string,
    dto: CreateItemReviewDto,
  ): Promise<IUseCaseResponse> {
    const item = await this.reviewRepository.addItemReview(itemId, dto, userId);

    return {
      data: item,
    };
  }
}
