import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';

export class DeleteItemUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async deleteItem(itemId: string): Promise<IUseCaseResponse> {
    const item = await this.itemsRepository.deleteItemById(itemId);

    return {
      data: item,
    };
  }
}
