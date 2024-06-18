import { Logger } from '@nestjs/common';
import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ICreateUserData } from 'src/domain/repositories/user-repository.interface';
import { CreateUserDto } from 'src/infrastructure/common/dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

export class RegisterUseCase {
  private logger: Logger;
  constructor(private readonly userRepository: UserRepository) {}

  async register(dto: ICreateUserData): Promise<IUseCaseResponse> {
    const user = await this.userRepository.createUser(dto);

    return {
      data: user,
    };
  }
}
