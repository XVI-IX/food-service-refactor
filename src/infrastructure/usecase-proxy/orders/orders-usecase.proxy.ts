import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UseCaseProxy } from '../usecase-proxy';
import { CreateOrderUseCase } from 'src/usecases/orders/createOrder.usecase';
import { GetAllOrdersUseCase } from 'src/usecases/orders/getAllOrders.usecase';
import { GetAllStoreOrdersUseCase } from 'src/usecases/orders/getAllStoreOrders.usecase';
import { GetAllUsersOrdersUseCase } from 'src/usecases/orders/getAllUsersOrders.usecase';
import { GetOrderByIdUseCaseProxy } from 'src/usecases/orders/getOrderById.usecase';
import { UpdateOrderUseCase } from 'src/usecases/orders/updateOrder.usecase';
import { ConfirmOrderUseCase } from 'src/usecases/orders/confirmOrder.usecase';

export const ORDERS_USECASE_CONSTANTS = {
  CREATE_ORDER: 'CREATE_ORDER_USECASE_PROXY',
  GET_ALL_ORDERS: 'GET_ALL_ORDERS_USECASE_PROXY',
  GET_ALL_USERS_ORDERS: 'GET_ALL_USERS_ORDERS_USECASE_PROXY',
  GET_ALL_STORE_ORDERS: 'GET_ALL_STORE_ORDERS_USECASE_PROXY',
  GET_ORDER_ITEMS: 'GET_ORDER_ITEMS_USECASE_PROXY',
  GET_ORDER_BY_ID: 'GET_ORDER_BY_ID_USECASE_PROXY',
  UPDATE_ORDER: 'UPDATE_ORDER_USECASE_PROXY',
  CONFIRM_ORDER: 'CONFIRM_ORDER_USECASE_PROXY',
  CANCEL_ORDER: 'CANCEL_ORDER_USECASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class OrdersUseCaseProxyModule {
  static CREATE_ORDER_USE_CASES_PROXY = 'CreateOrderUseCaseProxy';
  static GET_ALL_ORDERS_USE_CASES_PROXY = 'GetAllOrdersUseCaseProxy';
  static GET_ALL_USERS_ORDERS_USE_CASES_PROXY = 'GetAllUsersOrdersUseCaseProxy';
  static GET_ALL_STORE_ORDERS_USE_CASES_PROXY = 'GetAllStoreOrdersUseCaseProxy';
  static GET_ORDER_ITEMS_USE_CASES_PROXY = 'GetOrderItemsUseCaseProxy';
  static GET_ORDER_BY_ID_USE_CASES_PROXY = 'GetOrderByIdUseCaseProxy';
  static UPDATE_ORDER_USE_CASES_PROXY = 'UpdateOrderUseCaseProxy';
  static CONFIRM_ORDER_USE_CASES_PROXY = 'ConfirmOrderUseCaseProxy';
  static CANCEL_ORDER_USE_CASES_PROXY = 'CancelOrderUseCaseProxy';

  static register() {
    return {
      module: OrdersUseCaseProxyModule,
      providers: [
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.CREATE_ORDER_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new CreateOrderUseCase(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.GET_ALL_ORDERS_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetAllOrdersUseCase(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide:
            OrdersUseCaseProxyModule.GET_ALL_STORE_ORDERS_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetAllStoreOrdersUseCase(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide:
            OrdersUseCaseProxyModule.GET_ALL_USERS_ORDERS_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetAllUsersOrdersUseCase(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.GET_ORDER_BY_ID_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetOrderByIdUseCaseProxy(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.GET_ORDER_ITEMS_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new GetOrderByIdUseCaseProxy(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.UPDATE_ORDER_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new UpdateOrderUseCase(orderRepository)),
        },
        {
          inject: [OrderRepository],
          provide: OrdersUseCaseProxyModule.CONFIRM_ORDER_USE_CASES_PROXY,
          useFactory: (orderRepository: OrderRepository) =>
            new UseCaseProxy(new ConfirmOrderUseCase(orderRepository)),
        },
      ],
    };
  }
}
