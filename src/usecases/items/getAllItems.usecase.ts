import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class GetAllItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getAllItems(): Promise<IUseCaseResponse> {
    const items = await this.itemsRepository.getAllItems();

    return {
      data: items,
    };
  }
}
