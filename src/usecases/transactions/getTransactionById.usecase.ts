import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';

export class GetTransactionByIdUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async getTransactionById(transactionId: string): Promise<IUseCaseResponse> {
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId);

    return {
      data: transaction,
    };
  }
}
