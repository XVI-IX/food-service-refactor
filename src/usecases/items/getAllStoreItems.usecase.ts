import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';

export class getAllStoreItemsUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async getAllStoreItems(storeId: string): Promise<IUseCaseResponse> {
    const storeItems = await this.itemsRepository.getAllStoreItems(storeId);

    return {
      data: storeItems,
    };
  }
}
