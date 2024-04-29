import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/infrastructure/common/dto/auth/createUser.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async register (dto: CreateUserDto) {
    try {
      
    } catch (error) {
      
    }
  }
}
