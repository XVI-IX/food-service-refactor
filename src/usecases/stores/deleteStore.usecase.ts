import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class DeleteStoreUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async deleteStore(storeId: string): Promise<IUseCaseResponse> {
    const store = await this.storeRepository.deleteStore(storeId);

    return {
      data: store,
    };
  }
}
