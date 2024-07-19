import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';

export class GetAllTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getAllTransactions(): Promise<IUseCaseResponse> {
    const transactions = await this.transactionRepository.getAllTransactions();

    return {
      data: transactions,
    };
  }
}
