import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger;
  constructor() {
    super();
    this.logger = new Logger(PrismaService.name);
  }

  async onModuleInit() {
    await this.$connect;
    this.logger.log('Prisma service connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect;
    this.logger.log('Prisma service disconnected from database');
  }
}
