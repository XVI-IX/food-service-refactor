import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class getAllStoreItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getAllStoreItems(storeId: string): Promise<IUseCaseResponse> {
    const storeItems = await this.itemsRepository.getAllStoreItems(storeId);

    return {
      data: storeItems,
    };
  }
}
