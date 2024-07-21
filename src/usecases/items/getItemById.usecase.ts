import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';

export class GetItemByIdUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async getItemById(itemId: string): Promise<IUseCaseResponse> {
    const item = await this.itemsRepository.getItemById(itemId);

    return {
      data: item,
    };
  }
}
