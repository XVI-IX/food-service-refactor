import { IBase } from './base.interface';
import { IResponse } from './response.interface';
import { ServiceInterface } from './service.interface';
import { CreateTransactionDto } from '../../infrastructure/common/dto';

export interface ITransaction extends IBase {
  userId: string;
  description?: string;
  reference?: string;
  orderId?: string;
  storeId?: string;
  paymentStatus?: string;
  amount?: number;
  transactionType: string;
  paymentDate?: string;
  gatewayResponse?: any;
}

export interface ITransactionResponse extends IResponse {
  data?: ITransaction | ITransaction[] | null;
}

export interface ITransactionService {
  getAllTransactions(): Promise<ServiceInterface>;
  getTransactionById(transactionId: string): Promise<ServiceInterface>;
  addTransaction(dto: CreateTransactionDto): Promise<ServiceInterface>;
  getAllUsersTransactions(userId: string): Promise<ServiceInterface>;
  getAllStoreTransactions(storeId: string): Promise<ServiceInterface>;
  getAllOrderTransactions(orderId: string): Promise<ServiceInterface>;
}
