import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';
import { UpdateStoreDto } from 'src/infrastructure/common/dto';

export class UpdateStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async updateStore(storeId: string, dto: UpdateStoreDto) {
    const store = await this.storeRepository.updateStore(storeId, dto);

    return {
      data: store,
    };
  }
}
