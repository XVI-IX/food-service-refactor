import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './user.repository';
import { ItemsRepository } from './items.repository';
import { OrderRepository } from './orders.repository';
import { NotificationRepository } from './notification.repository';
import { ReviewRepository } from './review.repository';
import { SettingsRepository } from './settings.repository';
import { StoreRepository } from './store.repository';
import { TimeslotRepository } from './timeslot.repository';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaService,
    CustomerRepository,
    UserRepository,
    ItemsRepository,
    OrderRepository,
    NotificationRepository,
    ReviewRepository,
    SettingsRepository,
    StoreRepository,
    TimeslotRepository,
    TransactionRepository,
  ],
  exports: [
    CustomerRepository,
    UserRepository,
    ItemsRepository,
    OrderRepository,
    NotificationRepository,
    ReviewRepository,
    SettingsRepository,
    StoreRepository,
    TimeslotRepository,
    TransactionRepository,
  ],
})
export class RepositoriesModule {}
