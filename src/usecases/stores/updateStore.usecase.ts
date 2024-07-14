import { UpdateStoreDto } from 'src/infrastructure/common/dto';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class UpdateStoreUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async updateStore(storeId: string, dto: UpdateStoreDto) {
    const store = await this.storeRepository.updateStore(storeId, dto);

    return {
      data: store,
    };
  }
}
