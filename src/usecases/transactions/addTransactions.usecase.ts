import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';
import { CreateTransactionDto } from 'src/infrastructure/common/dto';

export class AddTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async addTransaction(dto: CreateTransactionDto): Promise<IUseCaseResponse> {
    const transaction = await this.transactionRepository.addTransaction(dto);

    return {
      data: transaction,
    };
  }
}
