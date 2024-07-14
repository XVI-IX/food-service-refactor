import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class GetAllUserStoresUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getAllUserStores(userId: string): Promise<IUseCaseResponse> {
    const userStores = await this.storeRepository.getAllUserStores(userId);

    return {
      data: userStores,
    };
  }
}
