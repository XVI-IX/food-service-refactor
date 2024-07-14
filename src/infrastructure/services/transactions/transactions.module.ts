import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  exports: [TransactionsService],
  providers: [TransactionsService],
})
export class TransactionsModule {}
