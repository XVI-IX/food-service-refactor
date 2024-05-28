import { Module } from '@nestjs/common';
import { AuthModule } from '../services/auth/auth.module';
import { CustomerModule } from '../services/customers/customers.module';
import { ItemModule } from '../services/items/items.module';
import { OrderModule } from '../services/orders/orders.module';
import { StoreModule } from '../services/stores/stores.module';
import { TimeslotModule } from '../services/timeslots/timeslots.module';
import { TransactionsModule } from '../services/transactions/transactions.module';
import { AuthController } from './auth/auth.controller';
import { CustomerController } from './customers/customers.controller';
import { ItemsController } from './items/items.controllers';
import { OrdersController } from './orders/orders.controllers';

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    ItemModule,
    OrderModule,
    StoreModule,
    TimeslotModule,
    TransactionsModule,
  ],
  controllers: [
    AuthController,
    CustomerController,
    ItemsController,
    OrdersController,
  ],
  providers: [],
})
export class ControllersModule {}
