import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';

export class DeleteStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async deleteStore(storeId: string): Promise<IUseCaseResponse> {
    const store = await this.storeRepository.deleteStore(storeId);

    return {
      data: store,
    };
  }
}
