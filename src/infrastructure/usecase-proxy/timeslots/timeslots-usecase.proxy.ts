import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { CreateTimeSlotUseCase } from 'src/usecases/timeslots/createTimeslot.usecase';
import { GetAllTimeslotsUseCase } from 'src/usecases/timeslots/getAllTimeslot.usecase';
import { GetTimeslotByIdUseCase } from 'src/usecases/timeslots/getTimeslotById.usecase';
import { UpdateTimeslotUseCase } from 'src/usecases/timeslots/updateTimeslot.usecase';
import { DeleteTimeslotByIdUseCase } from 'src/usecases/timeslots/deleteTimeslot.usecase';
import { DeleteAllTimeslotsUseCase } from 'src/usecases/timeslots/deleteAllTimeslots.usecase';

export const TIMESLOT_USECASE_CONSTANTS = {
  CREATE_TIMESLOT: 'CREATE_TIMESLOT_USE_CASE_PROXY',
  GET_ALL_TIMESLOTS: 'GET_ALL_TIMESLOTS_USE_CASE_PROXY',
  GET_TIMESLOT_BY_ID: 'GET_TIMESLOT_BY_ID_USE_CASE_PROXY',
  UPDATE_TIMESLOT: 'UPDATE_TIMESLOT_USE_CASE_PROXY',
  DELETE_TIMESLOT_BY_ID: 'DELETE_TIMESLOT_USE_CASE_PROXY',
  DELETE_ALL_TIMESLOTS: 'DELETE_ALL_TIMESLOTS_USE_CASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class TimeslotUseCaseProxyModule {
  static CREATE_TIMESLOT_USECASES_PROXY = 'CREATE_TIMESLOT_USECASES_PROXY';
  static GET_ALL_TIMESLOTS_USECASES_PROXY = 'GET_ALL_TIMESLOTS_USECASES_PROXY';
  static GET_TIMESLOT_BY_ID_USECASES_PROXY =
    'GET_TIMESLOT_BY_ID_USECASES_PROXY';
  static UPDATE_TIMESLOT_USECASES_PROXY = 'UPDATE_TIMESLOT_USECASES_PROXY';
  static DELETE_TIMESLOT_BY_ID_USECASES_PROXY =
    'DELETE_TIMESLOT_BY_ID_USECASES_PROXY';
  static DELETE_ALL_TIMESLOTS_USECASES_PROXY =
    'DELETE_ALL_TIMESLOTS_USECASES_PROXY';

  static register() {
    return {
      module: TimeslotUseCaseProxyModule,
      providers: [
        {
          inject: [TimeslotRepository],
          provide: TimeslotUseCaseProxyModule.CREATE_TIMESLOT_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new CreateTimeSlotUseCase(timeslotRepository)),
        },
        {
          inject: [TimeslotRepository],
          provide: TimeslotUseCaseProxyModule.GET_ALL_TIMESLOTS_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new GetAllTimeslotsUseCase(timeslotRepository)),
        },
        {
          inject: [TimeslotRepository],
          provide: TimeslotUseCaseProxyModule.GET_TIMESLOT_BY_ID_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new GetTimeslotByIdUseCase(timeslotRepository)),
        },
        {
          inject: [TimeslotRepository],
          provide: TimeslotUseCaseProxyModule.UPDATE_TIMESLOT_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new UpdateTimeslotUseCase(timeslotRepository)),
        },
        {
          inject: [TimeslotRepository],
          provide:
            TimeslotUseCaseProxyModule.DELETE_TIMESLOT_BY_ID_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new DeleteTimeslotByIdUseCase(timeslotRepository)),
        },
        {
          inject: [TimeslotRepository],
          provide:
            TimeslotUseCaseProxyModule.DELETE_ALL_TIMESLOTS_USECASES_PROXY,
          useFactory: (timeslotRepository: TimeslotRepository) =>
            new UseCaseProxy(new DeleteAllTimeslotsUseCase(timeslotRepository)),
        },
      ],
      exports: [
        TimeslotUseCaseProxyModule.CREATE_TIMESLOT_USECASES_PROXY,
        TimeslotUseCaseProxyModule.GET_ALL_TIMESLOTS_USECASES_PROXY,
        TimeslotUseCaseProxyModule.GET_TIMESLOT_BY_ID_USECASES_PROXY,
        TimeslotUseCaseProxyModule.UPDATE_TIMESLOT_USECASES_PROXY,
        TimeslotUseCaseProxyModule.DELETE_TIMESLOT_BY_ID_USECASES_PROXY,
        TimeslotUseCaseProxyModule.DELETE_ALL_TIMESLOTS_USECASES_PROXY,
      ],
    };
  }
}
