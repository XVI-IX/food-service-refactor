import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as moment from 'moment';
import { ServiceInterface } from '../../../domain/adapters';
import {
  ITimeslotEvent,
  ITimeslotService,
} from '../../../domain/adapters/timeslot.interface';
import { CreateTimeslotDto, UpdateTimeslotDto } from '../../common/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';
import { OrderRepository } from 'src/infrastructure/repositories/orders.repository';

@Injectable()
export class TimeslotService implements ITimeslotService {
  private readonly logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly emitter: EventEmitter2,
    private readonly timeslotRepository: TimeslotRepository,
    private readonly ordersRepository: OrderRepository,
  ) {
    this.logger = new Logger(TimeslotService.name);
  }

  async createTimeslot(dto: CreateTimeslotDto): Promise<ServiceInterface> {
    try {
      const timeslot = await this.timeslotRepository.createTimeslot(dto);

      return {
        data: timeslot,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllTimeslots(): Promise<ServiceInterface> {
    try {
      const timeslots = await this.timeslotRepository.getAllTimeslots();

      return {
        data: timeslots,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTimeslotById(timeslotId: string): Promise<ServiceInterface> {
    try {
      const timeslot =
        await this.timeslotRepository.getTimeslotById(timeslotId);

      return {
        data: timeslot,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<ServiceInterface> {
    try {
      const timeslot = await this.timeslotRepository.updateTimeslot(
        timeslotId,
        dto,
      );

      return {
        data: timeslot,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteTimeslotById(timeslotId: string): Promise<ServiceInterface> {
    try {
      const timeslot =
        await this.timeslotRepository.deleteTimeslotById(timeslotId);

      return {
        data: timeslot,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteAllTimeslots(): Promise<ServiceInterface> {
    try {
      const timeslots = await this.timeslotRepository.deleteAllTimeslots();

      return {
        data: timeslots,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createDynamicTimeslot(orderId: string): Promise<ServiceInterface> {
    try {
      const getConfirmedOrder =
        await this.ordersRepository.getConfirmedOrder(orderId);

      if (!getConfirmedOrder) {
        throw new BadRequestException('Confirmed order could not be retrieved');
      }

      const oneHourFromConfirmation = moment(getConfirmedOrder.updatedAt)
        .add(1, 'hour')
        .toDate();
      const twoHourFromConfirmation = moment(getConfirmedOrder.updatedAt)
        .add(2, 'hour')
        .toDate();

      const timeslotExists = await this.timeslotRepository.checkTimeslotExists(
        oneHourFromConfirmation,
        twoHourFromConfirmation,
      );

      if (timeslotExists) {
        const updateOrder = await this.ordersRepository.updateOrder(orderId, {
          timeslotId: timeslotExists.id,
        });

        await this.timeslotRepository.decrementTimeslotCapacity(
          timeslotExists.id,
          1,
          1,
        );

        return {
          data: updateOrder,
        };
      }

      const newTimeslot = await this.timeslotRepository.createTimeslot({
        startTime: moment(getConfirmedOrder.updatedAt)
          .add(1.5, 'hour')
          .toDate(),
        endTime: moment(getConfirmedOrder.updatedAt).add(2.5, 'hour').toDate(),
      });

      if (!newTimeslot) {
        throw new BadRequestException('Timeslot could not be created');
      }

      const updatedOrder = await this.ordersRepository.updateOrder(orderId, {
        timeslotId: newTimeslot.id,
        deliveryStatus: 'in_progress',
      });

      if (!updatedOrder) {
        throw new BadRequestException('Order timeslot could not be updated');
      }

      await this.timeslotRepository.decrementTimeslotCapacity(
        newTimeslot.id,
        1,
        1,
      );

      return {
        data: updatedOrder,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @OnEvent('order.confirmed.event')
  async onOrderConfirmed(
    payload: ITimeslotEvent,
  ): Promise<ServiceInterface<any>> {
    try {
      const event = await this.createDynamicTimeslot(payload.orderId);

      if (!event) {
        throw new BadRequestException('timeslot could not be created');
      }

      return {
        data: event,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
