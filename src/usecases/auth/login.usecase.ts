import { IArgonService } from 'src/domain/adapters/argon.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { LoginUserDto } from 'src/infrastructure/common/dto';


export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwt: IJwtService,
    private readonly argon: IArgonService,
  ) {}

  async login(dto: LoginUserDto): Promise<IUseCaseResponse> {
    const user = await this.userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new Error('invalid credentials');
    }
    if (!(await this.argon.verify(user.password, dto.password))) {
      throw new Error('invalid credentials');
    }
    const token = this.jwt.generateToken({
      id: user.id,
      email: user.email,
      roles: [user.role],
    });
    return { token };
  }
}
