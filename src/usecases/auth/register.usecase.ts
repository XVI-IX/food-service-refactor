import { Logger } from '@nestjs/common';
import { IArgonService } from 'src/domain/adapters/argon.interface';
import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICreateUserData, IUserRepository } from 'src/domain/repositories/user-repository.interface';


export class RegisterUseCase {
  private logger: Logger;
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argonService: IArgonService,
  ) {}

  async register(dto: ICreateUserData): Promise<IUseCaseResponse> {
    dto['password'] = await this.argonService.hash(dto.password);
    const user = await this.userRepository.createUser(dto);

    return {
      data: user,
    };
  }
}
