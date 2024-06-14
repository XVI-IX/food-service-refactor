import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/auth/createUser.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon from 'argon2';
import { randomBytes } from 'crypto';
import { IEmail } from 'src/domain/adapters/email.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  LoginUserDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from '../../common/dto';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { envConfig } from '../../config/environment.config';
import { ServiceInterface } from '../../../domain/adapters';
import { IAuthUser } from '../../common/decorators';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly emitter: EventEmitter2,
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async checkUser(email: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async register(dto: CreateUserDto): Promise<ServiceInterface> {
    try {
      const passwordHash = await argon.hash(dto.password);
      const verificationToken = this.generateOTP();

      const user = await this.userRepository.createUser({
        userName: dto.userName,
        phone: dto.phone,
        firstName: dto.firstName,
        otherName: dto.otherName,
        lastName: dto.lastName,
        email: dto.email,
        password: passwordHash,
        google_id: dto.google_id,
        role: dto.role,
        verificationToken: verificationToken,
      });

      const emailData: IEmail = {
        to: user.email,
        data: {
          userName: user.userName,
          token: user.verificationToken,
        },
      };
      const data = {
        userId: user.id,
      };
      this.emitter.emit('sendWelcomeEmail', emailData);
      this.emitter.emit('sendVerificationEmail', emailData);
      this.emitter.emit('UserRegisteration', data);

      return {
        data: user,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<ServiceInterface> {
    try {
      const verify = await this.userRepository.verifyEmail(dto);

      return {
        data: verify,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async authenticate(dto: LoginUserDto): Promise<ServiceInterface> {
    try {
      const checkExists = await this.userRepository.getUserByEmail(dto.email);

      const checkPassword = await argon.verify(
        checkExists.password,
        dto.password,
      );

      if (!checkPassword) {
        throw new UnauthorizedException('Invalid Password');
      }

      if (!checkExists.verified) {
        const updateToken = await this.userRepository.updateVerificationToken(
          dto.email,
        );

        const data: IEmail = {
          to: updateToken.email,
          data: {
            userName: updateToken.userName,
            token: updateToken.verificationToken,
          },
        };

        this.emitter.emit('sendVerificationTokenEmail', data);

        return {
          message: 'Please verify your email address',
          data: null,
        };
      }

      const payload: IAuthUser = {
        id: checkExists.id,
        email: checkExists.email,
        roles: [checkExists.role],
      };
      const token = await this.jwt.signAsync(payload, {
        secret: envConfig.getJWTSecret(),
        expiresIn: envConfig.getJwtExpiration(),
      });

      delete checkExists.password;

      return {
        message: 'User authenticated',
        data: {
          ...checkExists,
        },
        token: token,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<ServiceInterface<null>> {
    try {
      const checkExists = await this.userRepository.getUserByEmail(email);

      const payload = {
        sub: checkExists.id,
        email: checkExists.email,
      };

      const resetToken = await this.jwt.signAsync(payload, {
        secret: envConfig.getResetSecret(),
        expiresIn: envConfig.getJwtExpiration(),
      });

      await this.userRepository.updateResetToken(payload.email, resetToken);

      const data: IEmail = {
        to: checkExists.email,
        data: {
          userName: checkExists.userName,
          token: resetToken,
          tokenExpiration: envConfig.getJwtExpiration(),
        },
      };
      this.emitter.emit('sendResetTokenEmail', data);

      return {
        data: null,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async resetPassword(
    token: string,
    dto: ResetPasswordDto,
  ): Promise<ServiceInterface> {
    try {
      const revokedToken = await this.userRepository.checkRevokedToken(token);

      if (revokedToken) {
        throw new BadRequestException('Token already revoked.');
      }

      const payload = await this.jwt.verifyAsync(token, {
        secret: envConfig.getResetSecret(),
      });

      if (!payload) {
        throw new JsonWebTokenError('Reset token could not be verified');
      }

      const userExists = await this.prisma.users.findUnique({
        where: {
          id: payload.sub,
          email: payload.email,
        },
      });

      if (!userExists) {
        throw new NotFoundException('User with email address does not exist');
      }

      if (token === userExists.resetToken) {
        const tokenValid = await this.jwt.verifyAsync(token, {
          secret: envConfig.getResetSecret(),
        });

        if (!tokenValid) {
          throw new ForbiddenException('Token expired or invalid');
        }
      }

      const hash = await argon.hash(dto.newPassword);

      const updatedUser = await this.userRepository.updateUserPassword({
        email: payload.email,
        hash: hash,
      });

      await this.userRepository.revokeToken(token);

      return {
        data: updatedUser,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private generateOTP(): string {
    return randomBytes(3).toString('hex');
  }
}
