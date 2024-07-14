import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { AddTransactionUseCase } from 'src/usecases/transactions/addTransactions.usecase';
import { GetAllTransactionsUseCase } from 'src/usecases/transactions/getAllTransactions.usecase';
import { GetOrderTransactionsUseCase } from 'src/usecases/transactions/getOrderTransactions.usecase';
import { GetTransactionByIdUseCase } from 'src/usecases/transactions/getTransactionById.usecase';
import { GetStoreTransactionsUseCase } from 'src/usecases/transactions/getStoreTransactions.usecase';

export const TRANSACTIONS_USECASE_CONSTANTS = {
  GET_ORDER_TRANSACTIONS: 'GET_ORDER_TRANSACTIONS_USE_CASE_PROXY',
  ADD_TRANSACTION: 'ADD_TRANSACTION_USE_CASE_PROXY',
  GET_ALL_TRANSACTIONS: 'GET_ALL_TRANSACTIONS_USE_CASE_PROXY',
  GET_TRANSACTION_BY_ID: 'GET_TRANSACTION_BY_ID_USE_CASE_PROXY',
  GET_USER_TRANSACTIONS: 'GET_USER_TRANSACTIONS_USE_CASE_PROXY',
  GET_STORE_TRANSACTIONS: 'GET_STORE_TRANSACTIONS_USE_CASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class TransactionsUseCaseProxyModule {
  static GET_ORDER_TRANSACTIONS_USECASES_PROXY: 'GetOrderTransactionsUseCaseProxy';
  static ADD_TRANSACTION_USECASES_PROXY: 'AddTransactionUseCaseProxy';
  static GET_ALL_TRANSACTIONS_USECASES_PROXY: 'GetAllTransactionsUseCaseProxy';
  static GET_TRANSACTION_BY_ID_USECASES_PROXY: 'GetTransactionByIdUseCaseProxy';
  static GET_USER_TRANSACTIONS_USECASES_PROXY: 'GetUserTransactionsUseCaseProxy';
  static GET_STORE_TRANSACTIONS_USECASES_PROXY: 'GetStoreTransactionsUseCaseProxy';

  static register() {
    return {
      module: TransactionsUseCaseProxyModule,
      providers: [
        {
          inject: [TransactionRepository],
          provide:
            TransactionsUseCaseProxyModule.ADD_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(new AddTransactionUseCase(transactionRepository)),
        },
        {
          inject: [TransactionRepository],
          provide:
            TransactionsUseCaseProxyModule.GET_ALL_TRANSACTIONS_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(
              new GetAllTransactionsUseCase(transactionRepository),
            ),
        },
        {
          inject: [TransactionRepository],
          provide:
            TransactionsUseCaseProxyModule.GET_ORDER_TRANSACTIONS_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(
              new GetOrderTransactionsUseCase(transactionRepository),
            ),
        },
        {
          inject: [TransactionRepository],
          provide:
            TransactionsUseCaseProxyModule.GET_STORE_TRANSACTIONS_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(
              new GetStoreTransactionsUseCase(transactionRepository),
            ),
        },
        {
          inject: [TransactionRepository],
          provide:
            TransactionsUseCaseProxyModule.GET_TRANSACTION_BY_ID_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(
              new GetTransactionByIdUseCase(transactionRepository),
            ),
        },
      ],
    };
  }
}
