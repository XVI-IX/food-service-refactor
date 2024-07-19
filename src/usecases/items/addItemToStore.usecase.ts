import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';
import { CreateItemDto } from 'src/infrastructure/common/dto';

export class AddItemToStoreUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

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
