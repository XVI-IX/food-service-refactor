import { IArgonService } from 'src/domain/adapters/argon.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ResetPasswordDto } from 'src/infrastructure/common/dto';


export class ResetPasswordUseCasesProxy {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly argon: IArgonService,
    private readonly jwt: IJwtService,
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
