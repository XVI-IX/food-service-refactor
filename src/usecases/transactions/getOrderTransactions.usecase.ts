import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';

export class GetOrderTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getOrderTransaction(orderId: string): Promise<IUseCaseResponse> {
    const transaction =
      await this.transactionRepository.getOrderTransactions(orderId);

    return {
      data: transaction,
    };
  }
}
