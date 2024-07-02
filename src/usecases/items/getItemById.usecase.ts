import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class GetItemByIdUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getItemById(itemId: string): Promise<IUseCaseResponse> {
    const item = await this.itemsRepository.getItemById(itemId);

    return {
      data: item,
    };
  }
}
