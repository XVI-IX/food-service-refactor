import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';

export class GetStoreTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getStoreTransactions(storeId: string): Promise<IUseCaseResponse> {
    const transactions =
      await this.transactionRepository.getStoreTransactions(storeId);

    return {
      data: transactions,
    };
  }
}
