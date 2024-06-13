import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [PrismaModule],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class RepositoriesModule {}
