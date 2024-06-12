import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateCustomerDto } from '../../common/dto';
import { HttpResponse } from '../../common/helpers/response.helper';
import { CustomerService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(@Query('page') page: number) {
    const response = await this.customerService.getAllCustomers(page);
    return HttpResponse.send('Customers retrieved', response);
  }

  @Get('/:customerId')
  async getCustomerById(@Param('customerId') customerId: string) {
    const response = await this.customerService.getCustomerById(customerId);
    return HttpResponse.send('Customer data retrieved', response);
  }

  @Put('/:customerId')
  async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    const response = await this.customerService.updateCustomer(customerId, dto);
    return HttpResponse.send('Customer updated', response);
  }

  @Delete('/:customerId')
  async deleteCustomer(@Param('customerId') customerId: string) {
    const response = await this.customerService.deleteCustomer(customerId);
    return HttpResponse.send('Customer Deleted', response);
  }
}
