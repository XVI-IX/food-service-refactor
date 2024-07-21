import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';

export class GetAllStoresUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async getAllStores(): Promise<IUseCaseResponse> {
    const stores = await this.storeRepository.getAllStores();

    return {
      data: stores,
    };
  }
}
