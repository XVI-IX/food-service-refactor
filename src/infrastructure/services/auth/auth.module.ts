import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Module({
  providers: [AuthService, UserRepository],
  exports: [AuthService],
  imports: [PrismaModule, JwtModule, RepositoriesModule],
})
export class AuthModule {}
