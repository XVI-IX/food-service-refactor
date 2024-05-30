import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { TransactionsService } from 'src/infrastructure/services/transactions/transactions.service';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTransactions() {
    const response = await this.transactionsService.getAllTransactions();
    return HttpResponse.send('Transactions retrieved successfully', response);
  }

  @Get('/:transactionId')
  @HttpCode(HttpStatus.OK)
  async getTransactionById(@Param('transactionId') transactionId: string) {
    const response =
      await this.transactionsService.getTransactionById(transactionId);
    return HttpResponse.send('Transaction retrieved', response);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addTransaction(@Body() dto: CreateTransactionDto) {
    const response = await this.transactionsService.addTransaction(dto);
    return HttpResponse.send('Transaction record added successfully', response);
  }

  @Get('/all/users/:userId')
  @HttpCode(HttpStatus.OK)
  async getAllUsersTransactions(@Param('userId') userId: string) {
    const response =
      await this.transactionsService.getAllUsersTransactions(userId);
    return HttpResponse.send('Users transactions retrieved', response);
  }

  @Get('/all/stores/:storeId')
  @HttpCode(HttpStatus.OK)
  async getAllStoreTransactions(@Param('storeId') storeId: string) {
    const response =
      await this.transactionsService.getAllStoreTransactions(storeId);
    return HttpResponse.send('Store transactions retrieved', response);
  }

  @Get('/all/orders/:orderId')
  @HttpCode(HttpStatus.OK)
  async getAllOrderTransactions(@Param('orderId') orderId: string) {
    const response =
      await this.transactionsService.getAllOrderTransactions(orderId);
    return HttpResponse.send('Order transactions retrieved', response);
  }
}
