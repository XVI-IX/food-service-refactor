import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UseCaseProxy } from '../usecase-proxy';
import { GetAllCustomersUseCase } from 'src/usecases/customers/getAllCustomers.usecase';
import { GetCustomerByIdUseCase } from 'src/usecases/customers/getCustomerById.usecase';
import { UpdateCustomerUseCase } from 'src/usecases/customers/updateCustomer.usecase';
import { DeleteCustomerUseCase } from 'src/usecases/customers/deleteCustomers.usecase';

export const CUSTOMER_USECASE_CONSTANTS = {
  GET_ALL_CUSTOMERS: 'GET_ALL_CUSTOMERS_USECASE_PROXY',
  GET_CUSTOMER_BY_ID: 'GET_CUSTOMER_BY_ID_USE_CASE_PROXY',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER_USE_CASE_PROXY',
  DELETE_CUSTOMER: 'DELETE_CUSTOMER_USE_CASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class CustomerUseCaseProxyModule {
  static GET_ALL_CUSTOMERS_USE_CASES_PROXY = 'GetAllCustomersUseCasesProxy';
  static GET_CUSTOMER_BY_ID_USE_CASES_PROXY = 'GetCustomerByIdUseCaseProxy';
  static UPDATE_CUSTOMER_USE_CASES_PROXY = 'UpdateCustomerUseCaseProxy';
  static DELETE_CUSTOMER_USE_CASES_PROXY = 'DeleteCustomerUseCaseProxy';

  static register() {
    return {
      module: CustomerUseCaseProxyModule,
      providers: [
        {
          Inject: [CustomerRepository],
          provide: CustomerUseCaseProxyModule.GET_ALL_CUSTOMERS_USE_CASES_PROXY,
          useFactory: (customerRepository: CustomerRepository) =>
            new UseCaseProxy(new GetAllCustomersUseCase(customerRepository)),
        },
        {
          Inject: [CustomerRepository],
          provide:
            CustomerUseCaseProxyModule.GET_CUSTOMER_BY_ID_USE_CASES_PROXY,
          useFactory: (customerRepository: CustomerRepository) =>
            new UseCaseProxy(new GetCustomerByIdUseCase(customerRepository)),
        },
        {
          inject: [CustomerRepository],
          provide: CustomerUseCaseProxyModule.UPDATE_CUSTOMER_USE_CASES_PROXY,
          useFactory: (customerRepository: CustomerRepository) =>
            new UseCaseProxy(new UpdateCustomerUseCase(customerRepository)),
        },
        {
          inject: [CustomerRepository],
          provide: CustomerUseCaseProxyModule.DELETE_CUSTOMER_USE_CASES_PROXY,
          useFactory: (customerRepository: CustomerRepository) =>
            new UseCaseProxy(new DeleteCustomerUseCase(customerRepository)),
        },
      ],
    };
  }
}
