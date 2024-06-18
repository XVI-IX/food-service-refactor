import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionModel } from 'src/domain/models/transaction.model';
import { CreateTransactionDto } from '../common/dto';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TransactionRepository.name);
  }

  async getOrderTransactions(orderId: string): Promise<TransactionModel[]> {
    try {
      const orderTransactions = await this.prisma.transactions.findMany({
        where: {
          orderId: orderId,
        },
      });

      return orderTransactions;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Order transactions could not be retrieved',
      );
    }
  }

  async addTransaction(dto: CreateTransactionDto): Promise<TransactionModel> {
    try {
      const transaction = await this.prisma.transactions.create({
        data: {
          user: {
            connect: {
              id: dto.userId,
            },
          },
          description: dto.description,
          reference: dto.reference,
          order: {
            connect: {
              id: dto.orderId,
            },
          },
          store: {
            connect: {
              id: dto.storeId,
            },
          },
          paymentStatus: dto.paymentStatus,
          paymentDate: dto.paymentDate,
          transactionType: dto.transactionType,
          gatewayResponse: dto.gatewayResponse,
          amount: dto.amount,
        },
      });

      return transaction;
    } catch (error) {
      this.logger.error('Transaction could not be added', error.stack);
      throw new BadRequestException('Transaction could not be added');
    }
  }

  async getAllTransactions(): Promise<TransactionModel[]> {
    try {
      const transactions = await this.prisma.transactions.findMany({});

      return transactions;
    } catch (error) {
      this.logger.error('Transactions could not be retrieved', error.stack);
      throw new BadRequestException('transactions could not be retrieved');
    }
  }
  async getTransactionById(transactionId: string): Promise<TransactionModel> {
    try {
      const transaction = await this.prisma.transactions.findUnique({
        where: {
          id: transactionId,
        },
      });

      return transaction;
    } catch (error) {
      this.logger.error('Transaction could not be retrieved', error.stack);
      throw new BadRequestException('Transaction could not be retrieved');
    }
  }

  async getUserTransactions(userId: string): Promise<TransactionModel[]> {
    try {
      const userTransactions = await this.prisma.transactions.findMany({
        where: {
          userId: userId,
        },
      });

      return userTransactions;
    } catch (error) {
      this.logger.error(
        'User transactions could not be retrieved',
        error.stack,
      );
      throw new BadRequestException('User transaction could not be retrieved');
    }
  }

  async getStoreTransactions(storeId: string): Promise<TransactionModel[]> {
    try {
      const storeTransactions = await this.prisma.transactions.findMany({
        where: {
          storeId: storeId,
        },
      });

      return storeTransactions;
    } catch (error) {
      this.logger.error(
        'Store Transactions could not be retrieved',
        error.stack,
      );
      throw new BadRequestException(
        'Store transactions could not be retrieved',
      );
    }
  }
}
