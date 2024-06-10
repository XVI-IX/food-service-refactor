import {
  CreateTimeslotDto,
  UpdateTimeslotDto,
} from 'src/infrastructure/common/dto';
import { IBase } from './base.interface';
import { IOrders } from './orders.interface';
import { IResponse } from './response.interface';
import { ServiceInterface } from './service.interface';

export interface ITimeslot extends IBase {
  startTime: string;
  endTime: string;
  timezone: string;
  orderCount?: number;
  currentCapacity?: number;
  isAvailable: boolean;
  orders: IOrders[];
}

export interface ITimeslotEvent {
  orderId: string;
}

export interface ITimeslotResponse extends IResponse {
  data?: ITimeslot | ITimeslot[] | null;
}

export interface ITimeslotService {
  getAllTimeslots(): Promise<ServiceInterface>;
  getTimeslotById(timeslotId: string): Promise<ServiceInterface>;
  updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<ServiceInterface>;
  deleteTimeslotById(timeslotId: string): Promise<ServiceInterface>;
  deleteAllTimeslots(): Promise<ServiceInterface>;
  createTimeslot(dto: CreateTimeslotDto): Promise<ServiceInterface>;
  createDynamicTimeslot(orderId: string): Promise<ServiceInterface>;
  onOrderConfirmed(payload: ITimeslotEvent): Promise<ServiceInterface>;
}
