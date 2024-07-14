import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetStoreTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getStoreTransactions(storeId: string): Promise<IUseCaseResponse> {
    const transactions =
      await this.transactionRepository.getStoreTransactions(storeId);

    return {
      data: transactions,
    };
  }
}
