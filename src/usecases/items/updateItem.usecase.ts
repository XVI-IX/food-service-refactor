import { IItemsRepository } from 'src/domain/repositories/items-repository.interface';
import { UpdateItemDto } from 'src/infrastructure/common/dto';

export class UpdateItemUseCase {
  constructor(private readonly itemsRepository: IItemsRepository) {}

  async updateItem(itemId: string, dto: UpdateItemDto) {
    const item = this.itemsRepository.updateItemById(itemId, dto);

    return {
      data: item,
    };
  }
}
