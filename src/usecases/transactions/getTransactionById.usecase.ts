import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class GetTransactionByIdUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getTransactionById(transactionId: string): Promise<IUseCaseResponse> {
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId);

    return {
      data: transaction,
    };
  }
}
