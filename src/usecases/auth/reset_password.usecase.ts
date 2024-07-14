import { ResetPasswordDto } from 'src/infrastructure/common/dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ArgonService } from 'src/infrastructure/services/argon/argon.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

export class ResetPasswordUseCasesProxy {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argon: ArgonService,
    private readonly jwt: JwtTokenService,
  ) {}

  async resetPassword(token: string, dto: ResetPasswordDto) {
    const revokedToken = await this.userRepository.checkRevokedToken(token);
    const payload = await this.jwt.verifyResetToken(token);

    const userExists = await this.userRepository.getUserByEmail(payload.email);

    if (token === userExists.resetToken) {
      const tokenValid = await this.jwt.verifyResetToken(token);
    }

    const hash = await this.argon.hash(dto.newPassword);

    const updatedUser = await this.userRepository.updateUserPassword({
      email: payload.email,
      hash: hash,
    });

    await this.userRepository.revokeToken(token);

    return {
      data: updatedUser,
    };
  }
}
