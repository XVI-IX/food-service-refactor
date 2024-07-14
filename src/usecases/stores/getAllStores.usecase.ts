import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class GetAllStoresUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getAllStores(): Promise<IUseCaseResponse> {
    const stores = await this.storeRepository.getAllStores();

    return {
      data: stores,
    };
  }
}
