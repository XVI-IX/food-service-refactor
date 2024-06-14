import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, CustomerRepository],
  exports: [CustomerRepository],
})
export class RepositoriesModule {}
