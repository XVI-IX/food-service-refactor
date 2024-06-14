import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './user.repository';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaService,
    CustomerRepository,
    UserRepository,
    ItemsRepository,
  ],
  exports: [CustomerRepository, UserRepository, ItemsRepository],
})
export class RepositoriesModule {}
