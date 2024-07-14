import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderService } from './orders.service';
import { RepositoriesModule } from '../../repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
