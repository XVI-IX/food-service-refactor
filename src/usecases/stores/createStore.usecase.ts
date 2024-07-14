import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IAuthUser } from 'src/infrastructure/common/decorators';
import { CreateStoreDto } from 'src/infrastructure/common/dto';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';

export class CreateStoreUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async createStore(
    user: IAuthUser,
    dto: CreateStoreDto,
  ): Promise<IUseCaseResponse> {
    const store = await this.storeRepository.createStore(user, dto);

    return {
      data: store,
    };
  }
}
