import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetUserTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getUserTransactions(userId: string): Promise<IUseCaseResponse> {
    const userTransactions =
      await this.transactionRepository.getUserTransactions(userId);

    return {
      data: userTransactions,
    };
  }
}
