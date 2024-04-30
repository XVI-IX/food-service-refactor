import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/common/dto/auth/createUser.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as argon from 'argon2';
import { randomBytes } from 'crypto';
import { IEmail } from 'src/domain/adapters/email.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginUserDto } from 'src/infrastructure/common/dto';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/infrastructure/config/environment.config';

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

      if (!user) {
        throw new NotFoundException('User with email not found');
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const checkExists = await this.checkUser(dto.email);

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

      const data: IEmail = {
        to: user.email,
        data: {
          userName: user.userName,
          token: user.verificationToken,
        },
      };
      this.emitter.emit('sendWelcomeEmail', data);
      this.emitter.emit('sendVerificationEmail', data);

      return {
        message: 'Account created. Please verify your account',
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async authenticate(dto: LoginUserDto) {
    try {
      const checkExists = await this.checkUser(dto.email);

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

        return {
          message: 'Please verify your account',
          data: updateToken,
          success: true,
        };
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const checkExists = await this.checkUser(email);

      const payload = {
        sub: checkExists.id,
        email: checkExists.email,
      };

      const resetToken = await this.jwt.sign(payload, {
        secret: envConfig.getResetSecret,
        expiresIn: envConfig.getJwtExpiration,
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
        message: 'Reset token sent',
        data: null,
        success: true,
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
