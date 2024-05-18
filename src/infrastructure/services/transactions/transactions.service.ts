import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { transactions } from '@prisma/client';
import { ServiceInterface } from 'src/domain/adapters';
import { CreateTransactionDto } from 'src/infrastructure/common/dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TransactionsService.name);
  }

  async getAllTransactions(): Promise<ServiceInterface<transactions[]>> {
    try {
      const transactions = await this.prisma.transactions.findMany();

      if (!transactions) {
        throw new InternalServerErrorException(
          'Transactions could not be retrieved',
        );
      }

      return {
        data: transactions,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTransactionById(
    transactionId: number,
  ): Promise<ServiceInterface<transactions>> {
    try {
      const transaction = await this.prisma.transactions.findUnique({
        where: {
          id: transactionId,
        },
      });

      if (!transaction) {
        throw new UnprocessableEntityException(
          'Transaction could not be retrieved',
        );
      }

      return {
        data: transaction,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async addTransaction(
    dto: CreateTransactionDto,
  ): Promise<ServiceInterface<transactions>> {
    try {
      const transaction = await this.prisma.transactions.create({
        data: {
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
          paymentDate: dto.paymentDate,
          amount: dto.amount,
          transactionType: dto.transactionType,
          gatewayResponse: dto.gatewayResponse,
          paymentStatus: dto.paymentStatus,
        },
      });

      if (!transaction) {
        throw new UnprocessableEntityException(
          'Transaction could not be created',
        );
      }

      return {
        data: transaction,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
