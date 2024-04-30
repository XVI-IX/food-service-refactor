import { BaseModel } from './base.model';

export class PaymentModel extends BaseModel {
  reference: string;
  transactionId?: string;
  orderId: number;
  paymentStatus: string;
  amount: number;
  paymentDate?: string;
  gatewayResponse?: any;
}
