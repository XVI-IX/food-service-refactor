import { UpdateItemDto } from 'src/infrastructure/common/dto';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';

export class UpdateItemUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async updateItem(itemId: string, dto: UpdateItemDto) {
    const item = this.itemsRepository.updateItemById(itemId, dto);

    return {
      data: item,
    };
  }
}
