import {
  CreateTimeslotDto,
  UpdateTimeslotDto,
} from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { IOrders } from './orders.interface';
import { IResponse } from './response.interface';

export interface ITimeslot extends IBase {
  startTime: string;
  endTime: string;
  timezone: string;
  orderCount?: number;
  currentCapacity?: number;
  isAvailable: boolean;
  orders: IOrders[];
}

export interface ITimeslotResponse extends IResponse {
  data?: ITimeslot | ITimeslot[] | null;
}

export interface ITimeslotService {
  getAllTimeslots(): Promise<ITimeslotResponse>;
  getTimeslotById(timeslotId: string): Promise<ITimeslotResponse>;
  updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<ITimeslotResponse>;
  deleteTimeslotById(timeslotId: string): Promise<ITimeslotResponse>;
  deleteAllTimeslots(): Promise<ITimeslotResponse>;
  createTimeslot(dto: CreateTimeslotDto): Promise<ITimeslotResponse>;
  createDynamicTimeslot(orderId: string): Promise<ITimeslotResponse>;
}
