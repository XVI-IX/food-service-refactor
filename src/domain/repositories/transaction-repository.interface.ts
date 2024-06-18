import { CreateTransactionDto } from 'src/infrastructure/common/dto';
import { TransactionModel } from '../models/transaction.model';

export interface ITransactionRepository {
  getAllTransactions(): Promise<TransactionModel[]>;
  getTransactionById(transactionId: string): Promise<TransactionModel>;
  getUserTransactions(userId: string): Promise<TransactionModel[]>;
  getStoreTransactions(storeId: string): Promise<TransactionModel[]>;
  addTransaction(dto: CreateTransactionDto): Promise<TransactionModel>;
}
