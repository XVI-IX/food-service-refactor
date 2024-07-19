import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';

export class GetAllItemsUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async getAllItems(): Promise<IUseCaseResponse> {
    const items = await this.itemsRepository.getAllItems();

    return {
      data: items,
    };
  }
}
