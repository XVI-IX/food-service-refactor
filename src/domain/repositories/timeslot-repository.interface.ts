import {
  CreateTimeslotDto,
  UpdateTimeslotDto,
} from 'src/infrastructure/common/dto';
import { TimeslotModel } from '../models/timeslot.model';

export interface ITimeslotRepository {
  createTimeslot(dto: CreateTimeslotDto): Promise<TimeslotModel>;
  getAllTimeslots(): Promise<TimeslotModel[]>;
  getTimeslotById(timeslotId: string): Promise<TimeslotModel>;
  updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<TimeslotModel>;
  deleteTimeslotById(timeslotId: string): Promise<TimeslotModel>;
  deleteAllTimeslots(): Promise<TimeslotModel[] | boolean>;
  checkTimeslotExists(startTime: Date, endTime: Date): Promise<TimeslotModel>;
  decrementTimeslotCapacity(
    timeslotId: string,
    currentCapacity: number,
    orderCount: number,
  ): Promise<TimeslotModel>;
}
