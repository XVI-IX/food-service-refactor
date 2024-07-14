import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetAllTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getAllTransactions(): Promise<IUseCaseResponse> {
    const transactions = await this.transactionRepository.getAllTransactions();

    return {
      data: transactions,
    };
  }
}
