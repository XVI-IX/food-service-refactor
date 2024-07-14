import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { LoginUserDto } from 'src/infrastructure/common/dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ArgonService } from 'src/infrastructure/services/argon/argon.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtTokenService,
    private readonly argon: ArgonService,
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
