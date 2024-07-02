import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateItemDto } from 'src/infrastructure/common/dto';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class AddItemToStoreUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async addItemToStore(
    storeId: string,
    dto: CreateItemDto,
  ): Promise<IUseCaseResponse> {
    const item = await this.itemsRepository.addItemToStore(storeId, dto);

    return {
      data: item,
    };
  }
}
