import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { OrderService } from './orders.service';

@Module({
  imports: [PrismaModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
