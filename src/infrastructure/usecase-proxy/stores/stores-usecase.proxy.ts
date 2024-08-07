import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { StoreRepository } from 'src/infrastructure/repositories/store.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { CreateStoreUseCase } from 'src/usecases/stores/createStore.usecase';
import { GetAllStoresUseCase } from 'src/usecases/stores/getAllStores.usecase';
import { GetAllUserStoresUseCase } from 'src/usecases/stores/getAllUsersStores.usecase';
import { UpdateStoreUseCase } from 'src/usecases/stores/updateStore.usecase';
import { DeleteStoreUseCase } from 'src/usecases/stores/deleteStore.usecase';
import { GetStoreByIdUseCase } from 'src/usecases/stores/getStoreById.usecase';

export const STORES_USECASE_PROXY = {
  CREATE_STORE: 'CREATE_STORE_USE_CASE_PROXY',
  GET_ALL_STORES: 'GET_ALL_STORES_USE_CASE_PROXY',
  GET_ALL_USER_STORES: 'GET_ALL_USER_STORES_USE_CASE_PROXY',
  GET_STORE_BY_ID: 'GET_STORE_BY_ID_USE_CASE_PROXY',
  UPDATE_STORE: 'UPDATE_STORE_USE_CASE_PROXY',
  DELETE_STORE: 'DELETE_STORE_USE_CASE_PRXOY',
};

@Module({
  imports: [RepositoriesModule],
})
export class StoresUseCaseProxyModule {
  static CREATE_STORE_USE_CASES_PROXY = 'CREATE_STORE_USE_CASES_PROXY';
  static GET_ALL_STORES_USE_CASES_PROXY = 'GET_ALL_STORES_USE_CASES_PROXY';
  static GET_ALL_USER_STORES_USE_CASES_PROXY =
    'GET_ALL_USER_STORES_USE_CASES_PROXY';
  static GET_STORE_BY_ID_USE_CASES_PROXY = 'GET_STORE_BY_ID_USE_CASES_PROXY';
  static UPDATE_STORE_USE_CASES_PROXY = 'UPDATE_STORE_USE_CASES_PROXY';
  static DELETE_STORE_USE_CASES_PROXY = 'DELETE_STORE_USE_CASES_PROXY';

  static register() {
    return {
      module: StoresUseCaseProxyModule,
      providers: [
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.CREATE_STORE_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new CreateStoreUseCase(storeRepository)),
        },
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.GET_ALL_STORES_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new GetAllStoresUseCase(storeRepository)),
        },
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.GET_ALL_USER_STORES_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new GetAllUserStoresUseCase(storeRepository)),
        },
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.UPDATE_STORE_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new UpdateStoreUseCase(storeRepository)),
        },
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.DELETE_STORE_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new DeleteStoreUseCase(storeRepository)),
        },
        {
          inject: [StoreRepository],
          provide: StoresUseCaseProxyModule.GET_STORE_BY_ID_USE_CASES_PROXY,
          useFactory: (storeRepository: StoreRepository) =>
            new UseCaseProxy(new GetStoreByIdUseCase(storeRepository)),
        },
      ],

      exports: [
        StoresUseCaseProxyModule.CREATE_STORE_USE_CASES_PROXY,
        StoresUseCaseProxyModule.GET_ALL_STORES_USE_CASES_PROXY,
        StoresUseCaseProxyModule.GET_ALL_USER_STORES_USE_CASES_PROXY,
        StoresUseCaseProxyModule.GET_STORE_BY_ID_USE_CASES_PROXY,
        StoresUseCaseProxyModule.UPDATE_STORE_USE_CASES_PROXY,
        StoresUseCaseProxyModule.DELETE_STORE_USE_CASES_PROXY,
      ],
    };
  }
}
