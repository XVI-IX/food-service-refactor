import { Module } from '@nestjs/common';
import { AuthModule } from '../services/auth/auth.module';
import { CustomerModule } from '../services/customers/customers.module';
import { ItemModule } from '../services/items/items.module';
import { OrderModule } from '../services/orders/orders.module';
import { StoreModule } from '../services/stores/stores.module';
import { TimeslotModule } from '../services/timeslots/timeslots.module';
import { TransactionsModule } from '../services/transactions/transactions.module';
import { NotificationModule } from '../services/notifications/notification.module';
import { AuthController } from './auth/auth.controller';
import { CustomerController } from './customers/customers.controller';
import { ItemsController } from './items/items.controllers';
import { OrdersController } from './orders/orders.controllers';
import { StoreController } from './stores/store.controllers';
import { TimeslotController } from './timeslots/timeslots.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { NotificationController } from './notifications/notifications.controller';
import { SettingsController } from './settings/settings.controllers';

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    ItemModule,
    OrderModule,
    StoreModule,
    TimeslotModule,
    TransactionsModule,
    NotificationModule,
    SettingsController,
  ],
  controllers: [
    AuthController,
    CustomerController,
    ItemsController,
    OrdersController,
    StoreController,
    TimeslotController,
    TransactionsController,
    NotificationController,
    SettingsController,
  ],
  providers: [],
})
export class ControllersModule {}
