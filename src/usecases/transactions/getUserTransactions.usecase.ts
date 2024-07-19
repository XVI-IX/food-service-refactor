import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';

export class GetUserTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getUserTransactions(userId: string): Promise<IUseCaseResponse> {
    const userTransactions =
      await this.transactionRepository.getUserTransactions(userId);

    return {
      data: userTransactions,
    };
  }
}
