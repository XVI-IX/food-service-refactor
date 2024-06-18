import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ServiceInterface } from '../../../domain/adapters';
import { CreateTransactionDto } from '../../common/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ITransactionService } from '../../../domain/adapters';
import { TransactionRepository } from 'src/infrastructure/repositories/transaction.repository';

@Injectable()
export class TransactionsService implements ITransactionService {
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionsRepository: TransactionRepository,
  ) {
    this.logger = new Logger(TransactionsService.name);
  }

  async getAllTransactions(): Promise<ServiceInterface> {
    try {
      const transactions =
        await this.transactionsRepository.getAllTransactions();

      return {
        data: transactions,
      };
    } catch (error) {
      this.logger.error('Transactions could not be retrieved', error);
      throw new BadRequestException('Transactions could not be retrieved');
    }
  }

  async getTransactionById(transactionId: string): Promise<ServiceInterface> {
    try {
      const transaction =
        await this.transactionsRepository.getTransactionById(transactionId);

      return {
        data: transaction,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Transaction could not be retrieved');
    }
  }

  async addTransaction(dto: CreateTransactionDto): Promise<ServiceInterface> {
    try {
      const transaction = await this.transactionsRepository.addTransaction(dto);

      return {
        data: transaction,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Transaction could not be added');
    }
  }

  async getAllUsersTransactions(userId: string): Promise<ServiceInterface> {
    try {
      const userTransactions =
        await this.transactionsRepository.getUserTransactions(userId);

      return {
        data: userTransactions,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('User transactions could not be retrieved');
    }
  }

  async getAllStoreTransactions(storeId: string): Promise<ServiceInterface> {
    try {
      const storeTransactions =
        await this.transactionsRepository.getStoreTransactions(storeId);

      return {
        data: storeTransactions,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllOrderTransactions(orderId: string): Promise<ServiceInterface> {
    try {
      const orderTransactions =
        await this.transactionsRepository.getOrderTransactions(orderId);

      return {
        data: orderTransactions,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Order transactions could not be retrieved',
      );
    }
  }
}
