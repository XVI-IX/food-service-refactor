import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateTransactionDto } from 'src/infrastructure/common/dto';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

export class AddTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async addTransaction(dto: CreateTransactionDto): Promise<IUseCaseResponse> {
    const transaction = await this.transactionRepository.addTransaction(dto);

    return {
      data: transaction,
    };
  }
}
