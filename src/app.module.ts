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
