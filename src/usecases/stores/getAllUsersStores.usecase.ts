import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';

export class GetAllUserStoresUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async getAllUserStores(userId: string): Promise<IUseCaseResponse> {
    const userStores = await this.storeRepository.getAllUserStores(userId);

    return {
      data: userStores,
    };
  }
}
