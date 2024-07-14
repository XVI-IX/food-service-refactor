import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetOrderTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getOrderTransaction(orderId: string): Promise<IUseCaseResponse> {
    const transaction =
      await this.transactionRepository.getOrderTransactions(orderId);

    return {
      data: transaction,
    };
  }
}
