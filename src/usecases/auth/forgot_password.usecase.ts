import { IJwtPayload } from 'src/domain/adapters/jwt.interface';
import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtTokenService,
  ) {}

  async forgotPassword(email: string): Promise<IUseCaseResponse> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('invalid credentials');
    }
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: [user.role],
    };

    const token = this.jwt.generateResetToken(payload);

    const resetToken = await this.userRepository.updateResetToken(email, token);

    return { data: resetToken };
  }
}
