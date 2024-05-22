import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [PrismaModule, JwtModule],
})
export class AuthModule {}
