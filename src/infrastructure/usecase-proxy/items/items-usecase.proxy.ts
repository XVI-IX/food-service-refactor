import { Module } from '@nestjs/common';
import { ItemsRepository } from 'src/infrastructure/repositories/items.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UseCaseProxy } from '../usecase-proxy';
import { GetAllItemsUseCase } from 'src/usecases/items/getAllItems.usecase';
import { GetItemByIdUseCase } from 'src/usecases/items/getItemById.usecase';
import { UpdateItemUseCase } from 'src/usecases/items/updateItem.usecase';
import { DeleteItemUseCase } from 'src/usecases/items/deleteItem.usecase';
import { AddItemToStoreUseCase } from 'src/usecases/items/addItemToStore.usecase';
import { getAllStoreItemsUseCase } from 'src/usecases/items/getAllStoreItems.usecase';

export const ITEMS_USECASE_CONSTANTS = {
  GET_ALL_ITEMS: 'GET_ALL_ITEMS_USECASE_PROXY',
  GET_ITEM_BY_ID: 'GET_ITEM_BY_ID_USECASE_PROXY',
  UPDATE_ITEM: 'UPDATE_ITEM_USECASE_PROXY',
  DELETE_ITEM: 'DELETE_ITEM_USECASE_PROXY',
  GET_ALL_STORE_ITEMS: 'GET_ALL_STORE_ITEMS',
  ADD_ITEM_TO_STORE: 'ADD_ITEM_TO_STORE',
};

@Module({
  imports: [RepositoriesModule],
})
export class ItemsUseCaseProxyModule {
  static GET_ALL_ITEMS_USE_CASES_PROXY = 'GET_ALL_ITEMS_USE_CASES_PROXY';
  static GET_ITEM_BY_ID_USE_CASES_PROXY = 'GET_ITEM_BY_ID_USE_CASES_PROXY';
  static UPDATE_ITEM_USE_CASES_PROXY = 'UPDATE_ITEM_USE_CASES_PROXY';
  static DELETE_ITEM_USE_CASES_PROXY = 'DELETE_ITEM_USE_CASES_PROXY';
  static GET_ALL_STORE_ITEMS_USE_CASES_PROXY =
    'GET_ALL_STORE_ITEMS_USE_CASES_PROXY';
  static ADD_ITEM_TO_STORE_USE_CASES_PROXY =
    'ADD_ITEM_TO_STORE_USE_CASES_PROXY';

  static register() {
    return {
      module: ItemsUseCaseProxyModule,
      providers: [
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.GET_ALL_ITEMS_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new GetAllItemsUseCase(itemsRepository)),
        },
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.GET_ITEM_BY_ID_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new GetItemByIdUseCase(itemsRepository)),
        },
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.UPDATE_ITEM_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new UpdateItemUseCase(itemsRepository)),
        },
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.DELETE_ITEM_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new DeleteItemUseCase(itemsRepository)),
        },
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.ADD_ITEM_TO_STORE_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new AddItemToStoreUseCase(itemsRepository)),
        },
        {
          inject: [ItemsRepository],
          provide: ItemsUseCaseProxyModule.GET_ALL_STORE_ITEMS_USE_CASES_PROXY,
          useFactory: (itemsRepository: ItemsRepository) =>
            new UseCaseProxy(new getAllStoreItemsUseCase(itemsRepository)),
        },
      ],
      exports: [
        ItemsUseCaseProxyModule.GET_ALL_ITEMS_USE_CASES_PROXY,
        ItemsUseCaseProxyModule.GET_ITEM_BY_ID_USE_CASES_PROXY,
        ItemsUseCaseProxyModule.UPDATE_ITEM_USE_CASES_PROXY,
        ItemsUseCaseProxyModule.ADD_ITEM_TO_STORE_USE_CASES_PROXY,
        ItemsUseCaseProxyModule.DELETE_ITEM_USE_CASES_PROXY,
        ItemsUseCaseProxyModule.GET_ALL_STORE_ITEMS_USE_CASES_PROXY,
      ],
    };
  }
}
