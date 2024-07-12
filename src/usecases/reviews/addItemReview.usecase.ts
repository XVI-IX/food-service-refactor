import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateItemReviewDto } from 'src/infrastructure/common/dto';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';

export class AddItemReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

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
