import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CustomerService } from './customers.service';
// import { CustomerRepository } from '../../repositories/customer.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
