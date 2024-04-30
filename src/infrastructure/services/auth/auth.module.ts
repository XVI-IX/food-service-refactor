import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [PrismaModule],
})
export class AuthModule {}
