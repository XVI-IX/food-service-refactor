import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [PrismaModule],
  exports: [TransactionsService],
  providers: [TransactionsService],
})
export class TransactionsModule {}
