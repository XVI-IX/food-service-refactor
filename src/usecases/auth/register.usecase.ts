import { Logger } from '@nestjs/common';
import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICreateUserData } from 'src/domain/repositories/user-repository.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ArgonService } from 'src/infrastructure/services/argon/argon.service';

export class RegisterUseCase {
  private logger: Logger;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argonService: ArgonService,
  ) {}

  async register(dto: ICreateUserData): Promise<IUseCaseResponse> {
    dto['password'] = await this.argonService.hash(dto.password);
    const user = await this.userRepository.createUser(dto);

    return {
      data: user,
    };
  }
}
