import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class DeleteItemUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async deleteItem(itemId: string): Promise<IUseCaseResponse> {
    const item = await this.itemsRepository.deleteItemById(itemId);

    return {
      data: item,
    };
  }
}
