import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class GetStoreByIdUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getStoreById(storeId: string): Promise<IUseCaseResponse> {
    const store = await this.storeRepository.getStoreById(storeId);

    return {
      data: store,
    };
  }
}
