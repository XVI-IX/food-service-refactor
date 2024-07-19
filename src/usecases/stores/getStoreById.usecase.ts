import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';

export class GetStoreByIdUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async getStoreById(storeId: string): Promise<IUseCaseResponse> {
    const store = await this.storeRepository.getStoreById(storeId);

    return {
      data: store,
    };
  }
}
