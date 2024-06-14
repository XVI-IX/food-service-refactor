import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import {
  ICreateUserData,
  IResetPasswordData,
  IUserRepository,
  IVerifyEmail,
} from '../../domain/repositories/user-repository.interface';
import { UserModel } from 'src/domain/models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'node:crypto';
import { envConfig } from '../config/environment.config';

export class UserRepository implements IUserRepository {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UserRepository.name);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
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
      this.logger.error('User could not be retrieved by email', error.stack);
      throw error;
    }
  }

  async createUser(dto: ICreateUserData): Promise<UserModel> {
    try {
      const exists = await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (exists) {
        throw new BadRequestException('Provided email is already in use.');
      }

      const user = await this.prisma.users.create({
        data: {
          userName: dto.userName,
          phone: dto.phone,
          firstName: dto.firstName,
          otherName: dto.otherName,
          lastName: dto.lastName,
          email: dto.email,
          password: dto.password,
          google_id: dto.google_id,
          role: dto.role,
          verificationToken: dto.verificationToken,
        },
      });

      if (!user) {
        throw new BadRequestException('User could not be created');
      }

      delete user.password;

      return user;
    } catch (error) {
      this.logger.error('User could not be created', error.stack);
      throw error;
    }
  }

  async verifyEmail(dto: IVerifyEmail): Promise<UserModel> {
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
        select: {
          id: true,
          userName: true,
          verified: true,
        },
      });

      if (!verify) {
        throw new BadRequestException('User email could not be verified');
      }

      return verify;
    } catch (error) {
      this.logger.error('User email could not be verified', error.stack);
      throw error;
    }
  }

  async updateVerificationToken(email: string): Promise<UserModel> {
    try {
      const verificationToken = this.generateOTP();
      const tokenUpdate = await this.prisma.users.update({
        where: {
          email: email,
        },
        data: {
          verificationToken: verificationToken,
        },
        select: {
          email: true,
          userName: true,
          verificationToken: true,
        },
      });

      if (!tokenUpdate) {
        throw new BadRequestException(
          'Verification token could not be updated',
        );
      }

      return tokenUpdate;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateResetToken(
    email: string,
    resetToken: string,
  ): Promise<UserModel> {
    try {
      const token = await this.prisma.users.update({
        where: {
          email: email,
        },
        data: {
          resetToken: resetToken,
          resetTokenExpiration: envConfig.getJwtExpiration(),
        },
      });

      return token;
    } catch (error) {
      this.logger.error('Reset token could not be updated', error.stack);
      throw error;
    }
  }

  async checkRevokedToken(token: string): Promise<boolean> {
    try {
      const revokeToken = await this.prisma.revokedToken.findUnique({
        where: {
          token: token,
        },
      });

      if (!revokeToken) {
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error('Token could not be confirmed', error.stack);
      throw error;
    }
  }

  async revokeToken(token: string): Promise<any> {
    try {
      const revokeToken = await this.prisma.revokedToken.create({
        data: {
          token: token,
        },
      });

      if (!revokeToken) {
        throw new BadRequestException('Token could not be revoked');
      }

      return true;
    } catch (error) {
      this.logger.error('Token could not be revoked', error.stack);
      throw error;
    }
  }

  async updateUserPassword(dto: IResetPasswordData): Promise<UserModel> {
    try {
      const updateUser = await this.prisma.users.update({
        where: {
          email: dto.email,
        },
        data: {
          password: dto.hash,
          resetToken: null,
        },
        select: {
          userName: true,
          email: true,
        },
      });

      if (!updateUser) {
        throw new BadRequestException('User password could not be changed');
      }

      return updateUser;
    } catch (error) {
      this.logger.error('User password could not be deleted', error.stack);
      throw error;
    }
  }

  private generateOTP(): string {
    return randomBytes(3).toString('hex');
  }
}
