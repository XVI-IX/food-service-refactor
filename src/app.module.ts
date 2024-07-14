import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderModule } from './infrastructure/services/orders/orders.module';
import { AuthModule } from './infrastructure/services/auth/auth.module';
import { ItemModule } from './infrastructure/services/items/items.module';
import { CustomerModule } from './infrastructure/services/customers/customers.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infrastructure/common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWtTokenModule } from './infrastructure/services/jwt/jwt.module';
import { AuthUseCaseProxyModule } from './infrastructure/usecase-proxy/auth/auth-usesace.proxy';
import { CustomerUseCaseProxyModule } from './infrastructure/usecase-proxy/customers/customers-usecase.proxy';
import { ItemsUseCaseProxyModule } from './infrastructure/usecase-proxy/items/items-usecase.proxy';
import { NotificationsUseCaseProxyModule } from './infrastructure/usecase-proxy/notifications/notifications-usecase.proxy';
import { OrdersUseCaseProxyModule } from './infrastructure/usecase-proxy/orders/orders-usecase.proxy';
import { ReviewsUseCaseProxyModule } from './infrastructure/usecase-proxy/reviews/reviews-usecase.proxy';
import { SettingsUseCaseProxyModule } from './infrastructure/usecase-proxy/settings/settings-usecase.proxy';
import { StoresUseCaseProxyModule } from './infrastructure/usecase-proxy/stores/stores-usecase.proxy';
import { TimeslotUseCaseProxyModule } from './infrastructure/usecase-proxy/timeslots/timeslots-usecase.proxy';
import { TransactionsUseCaseProxyModule } from './infrastructure/usecase-proxy/transactions/transactions-usecase.proxy';

@Module({
  imports: [
    JwtModule,
    OrderModule,
    AuthModule,
    ItemModule,
    CustomerModule,
    JWtTokenModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
    AuthUseCaseProxyModule.register(),
    CustomerUseCaseProxyModule.register(),
    ItemsUseCaseProxyModule.register(),
    NotificationsUseCaseProxyModule.register(),
    OrdersUseCaseProxyModule.register(),
    ReviewsUseCaseProxyModule.register(),
    SettingsUseCaseProxyModule.register(),
    StoresUseCaseProxyModule.register(),
    TimeslotUseCaseProxyModule.register(),
    TransactionsUseCaseProxyModule.register(),
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
