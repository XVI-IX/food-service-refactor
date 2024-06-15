import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './user.repository';
import { ItemsRepository } from './items.repository';
import { OrderRepository } from './orders.repository';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaService,
    CustomerRepository,
    UserRepository,
    ItemsRepository,
    OrderRepository,
    NotificationRepository,
  ],
  exports: [
    CustomerRepository,
    UserRepository,
    ItemsRepository,
    OrderRepository,
    NotificationRepository,
  ],
})
export class RepositoriesModule {}
