import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IStoreRepository } from 'src/domain/repositories/store-repository.interface';
import { IAuthUser } from 'src/infrastructure/common/decorators';
import { CreateStoreDto } from 'src/infrastructure/common/dto';

export class CreateStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

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
