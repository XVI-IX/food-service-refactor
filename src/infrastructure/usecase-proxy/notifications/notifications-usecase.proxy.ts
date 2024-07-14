import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/infrastructure/repositories/notification.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UseCaseProxy } from '../usecase-proxy';
import { GetAllNotificationsUseCase } from 'src/usecases/notifications/getAllNotifications.usecase';
import { GetNotificationByIdUseCase } from 'src/usecases/notifications/getNotificationById.usecase';
import { GetAllUsersNotificationUseCase } from 'src/usecases/notifications/getAllUsersNotifications.usecase';
import { GetNotificationsForStoreUseCase } from 'src/usecases/notifications/getAllStoreNotifications.usecase';
import { MarkNotificationAsReadUseCase } from 'src/usecases/notifications/markNotificationAsRead.usecase';
import { CreateNotificationForUserUseCase } from 'src/usecases/notifications/createNotificationForUser.usecase';
import { CreateNotificationForStoreUseCase } from 'src/usecases/notifications/createNotificationForStore.usecase';
import { DeleteAllNotificationsForUserUseCase } from 'src/usecases/notifications/deleteAllNotificationsForUser.usecase';
import { DeleteNotificationByIdUseCase } from 'src/usecases/notifications/deleteNotificationById.usecase';

export const NOTIFICATION_USECASE_CONSTANTS = {
  GET_ALL_NOTIFICATIONS: 'GET_ALL_NOTIFICATIONS_USECASE_PROXY',
  GET_NOTIFICATION_BY_ID: 'GET_NOTIFICATION_BY_ID_USECASE_PROXY',
  GET_ALL_USERS_NOTIFICATIONS: 'GET_ALL_USERS_NOTIFICATION_USECASE_PROXY',
  GET_ALL_STORE_NOTIFICATIONS: 'GET_ALL_STORE_NOTIFICATIONS_USECASE_PROXY',
  MARK_NOTIFICATION_AS_READ: 'MARK_NOTIFICATION_AS_READ_USECASE_PROXY',
  CREATE_NOTIFICATION_FOR_USER: 'CREATE_NOTIFICATION_FOR_USER_USECASE_PROXY',
  CREATE_NOTIFICATION_FOR_STORE: 'CREATE_NOTIFICATION_FOR_STORE_USECASE_PROXY',
  DELETE_ALL_NOTIFICATIONS_FOR_USER:
    'DELETE_ALL_NOTIFICATION_FOR_USER_USECASE_PROXY',
  DELETE_NOTIFICATION_BY_ID: 'DELETE_NOTIFICATION_BY_ID_USECASE_PROXY',
  CREATE_NOTIFICATION_FOR_ALL_USERS:
    'CREATE_NOTIFICATION_FOR_ALL_USERS_USECASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class NotificationsUseCaseProxyModule {
  static GET_ALL_NOTIFICATIONS_USE_CASES_PROXY =
    'GET_ALL_NOTIFICATIONS_USE_CASES_PROXY';
  static GET_NOTIFICATION_BY_ID_USE_CASES_PROXY =
    'GET_NOTIFICATION_BY_ID_USE_CASES_PROXY';
  static GET_ALL_USERS_NOTIFICATIONS_USE_CASES_PROXY =
    'GET_ALL_USERS_NOTIFICATIONS_USE_CASES_PROXY';
  static GET_ALL_STORE_NOTIFICATIONS_USE_CASES_PROXY =
    'GET_ALL_STORE_NOTIFICATIONS_USE_CASES_PROXY';
  static MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY =
    'MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY';
  static CREATE_NOTIFICATION_FOR_USER_USE_CASES_PROXY =
    'CREATE_NOTIFICATION_FOR_USER_USE_CASES_PROXY';
  static CREATE_NOTIFICATION_FOR_STORE_USE_CASES_PROXY =
    'CREATE_NOTIFICATION_FOR_STORE_USE_CASES_PROXY';
  static DELETE_ALL_NOTIFICATIONS_FOR_USER_USE_CASES_PROXY =
    'DELETE_ALL_NOTIFICATIONS_FOR_USER_USE_CASES_PROXY';
  static DELETE_NOTIFICATION_BY_ID_USE_CASES_PROXY =
    'DELETE_NOTIFICATION_BY_ID_USE_CASES_PROXY';
  static CREATE_NOTIFICATION_FOR_ALL_USERS_USE_CASES_PROXY =
    'CREATE_NOTIFICATION_FOR_ALL_USERS_USE_CASES_PROXY';

  static register() {
    return {
      module: NotificationsUseCaseProxyModule,
      providers: [
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.GET_ALL_NOTIFICATIONS_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new GetAllNotificationsUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.GET_NOTIFICATION_BY_ID_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new GetNotificationByIdUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.GET_ALL_USERS_NOTIFICATIONS_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new GetAllUsersNotificationUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.GET_ALL_STORE_NOTIFICATIONS_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new GetNotificationsForStoreUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new MarkNotificationAsReadUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.CREATE_NOTIFICATION_FOR_USER_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new CreateNotificationForUserUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.CREATE_NOTIFICATION_FOR_STORE_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new CreateNotificationForStoreUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.DELETE_ALL_NOTIFICATIONS_FOR_USER_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new DeleteAllNotificationsForUserUseCase(notificationRepository),
            ),
        },
        {
          inject: [NotificationRepository],
          provide:
            NotificationsUseCaseProxyModule.DELETE_NOTIFICATION_BY_ID_USE_CASES_PROXY,
          useFactory: (notificationRepository: NotificationRepository) =>
            new UseCaseProxy(
              new DeleteNotificationByIdUseCase(notificationRepository),
            ),
        },
      ],
      exports: [
        NotificationsUseCaseProxyModule.GET_ALL_NOTIFICATIONS_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.GET_NOTIFICATION_BY_ID_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.GET_ALL_USERS_NOTIFICATIONS_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.GET_ALL_STORE_NOTIFICATIONS_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.MARK_NOTIFICATION_AS_READ_USE_CASE_PROXY,
        NotificationsUseCaseProxyModule.CREATE_NOTIFICATION_FOR_ALL_USERS_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.CREATE_NOTIFICATION_FOR_STORE_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.CREATE_NOTIFICATION_FOR_USER_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.DELETE_ALL_NOTIFICATIONS_FOR_USER_USE_CASES_PROXY,
        NotificationsUseCaseProxyModule.DELETE_NOTIFICATION_BY_ID_USE_CASES_PROXY,
      ],
    };
  }
}
