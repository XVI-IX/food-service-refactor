import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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
import { users } from '@prisma/client';
import { IAuthUser } from '../../common/decorators';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly emitter: EventEmitter2,
    private readonly jwt: JwtService,
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

  async register(dto: CreateUserDto): Promise<ServiceInterface<users>> {
    try {
      const checkExists = await this.checkUser(dto.email);

      if (checkExists) {
        throw new BadRequestException('Email already in use.');
      }

      const passwordHash = await argon.hash(dto.password);
      const verificationToken = this.generateOTP();

      const user = await this.prisma.users.create({
        data: {
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
        },
      });

      if (!user) {
        throw new InternalServerErrorException(
          'User account could not be created',
        );
      }

      delete user.password;

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

  async verifyEmail(dto: VerifyEmailDto): Promise<ServiceInterface<null>> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new NotFoundException('User with email not found');
      }

      const verify = await this.prisma.users.update({
        where: {
          id: user.id,
          verificationToken: dto.token,
        },
        data: {
          verified: true,
        },
      });

      if (!verify) {
        throw new BadRequestException('User email could not be verified');
      }

      return {
        data: null,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async authenticate(dto: LoginUserDto): Promise<ServiceInterface<users>> {
    try {
      const checkExists = await this.checkUser(dto.email);

      if (!checkExists) {
        throw new NotFoundException('User with email not found');
      }

      const checkPassword = await argon.verify(
        checkExists.password,
        dto.password,
      );

      if (!checkPassword) {
        throw new UnauthorizedException('Invalid Password');
      }

      if (!checkExists.verified) {
        const verificationToken = this.generateOTP();

        const updateToken = await this.prisma.users.update({
          where: {
            email: dto.email,
          },
          data: {
            verificationToken: verificationToken,
          },
        });

        if (!updateToken) {
          throw new InternalServerErrorException(
            'Verification token could not be created',
          );
        }

        const data: IEmail = {
          to: updateToken.email,
          data: {
            userName: updateToken.userName,
            token: updateToken.verificationToken,
          },
        };

        this.emitter.emit('sendVerificationTokenEmail', data);

        delete updateToken.password;

        return {
          data: updateToken,
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
      const checkExists = await this.checkUser(email);

      const payload = {
        sub: checkExists.id,
        email: checkExists.email,
      };

      const resetToken = await this.jwt.signAsync(payload, {
        secret: envConfig.getResetSecret(),
        expiresIn: envConfig.getJwtExpiration(),
      });

      await this.prisma.users.update({
        where: {
          email: email,
        },
        data: {
          resetToken: resetToken,
          resetTokenExpiration: envConfig.getJwtExpiration(),
        },
      });

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
  ): Promise<ServiceInterface<users>> {
    try {
      const revokedToken = await this.prisma.revokedToken.findUnique({
        where: {
          token: token,
        },
      });

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

      const updatedUser = await this.prisma.users.update({
        where: {
          email: payload.email,
        },
        data: {
          password: hash,
          resetToken: null,
        },
      });

      if (!updatedUser) {
        throw new BadRequestException(
          `resetPassword: Password could not be reset`,
        );
      }

      delete updatedUser.password;

      const revokeToken = await this.prisma.revokedToken.create({
        data: {
          token: token,
        },
      });

      if (!revokeToken) {
        throw new BadRequestException('Token could not be revoked');
      }

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
