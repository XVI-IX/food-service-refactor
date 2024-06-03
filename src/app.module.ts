import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderModule } from './infrastructure/services/orders/orders.module';
import { AuthModule } from './infrastructure/services/auth/auth.module';
import { ItemModule } from './infrastructure/services/items/items.module';
import { CustomerModule } from './infrastructure/services/customers/customers.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    OrderModule,
    AuthModule,
    ItemModule,
    CustomerModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
