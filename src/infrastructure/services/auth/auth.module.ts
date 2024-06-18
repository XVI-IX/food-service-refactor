import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ArgonModule } from '../argon/argon.module';
import { JWtTokenModule } from '../jwt/jwt.module';

@Module({
  providers: [AuthService, UserRepository],
  exports: [AuthService],
  imports: [PrismaModule, JWtTokenModule, RepositoriesModule, ArgonModule],
})
export class AuthModule {}
