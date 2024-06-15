import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ITimeslotRepository } from '../../domain/repositories/timeslot-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { TimeslotModel } from '../../domain/models/timeslot.model';
import { CreateTimeslotDto, UpdateTimeslotDto } from '../common/dto';

@Injectable()
export class TimeslotRepository implements ITimeslotRepository {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TimeslotRepository.name);
  }

  async decrementTimeslotCapacity(
    timeslotId: string,
    currentCapacity: number,
    orderCount: number,
  ): Promise<TimeslotModel> {
    try {
      const timeslot = await this.prisma.timeslots.update({
        where: {
          id: timeslotId,
        },
        data: {
          currentCapacity: {
            decrement: currentCapacity,
          },
          orderCount: {
            increment: orderCount,
          },
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be decremented');
      }

      return timeslot;
    } catch (error) {
      this.logger.error(
        'Timeslot capacity could not be decremented',
        error.stack,
      );
      throw error;
    }
  }

  async checkTimeslotExists(
    startTime: Date,
    endTime: Date,
  ): Promise<TimeslotModel> {
    try {
      const timeslot = await this.prisma.timeslots.findFirst({
        where: {
          startTime: startTime,
          endTime: endTime,
          isAvailable: true,
          currentCapacity: {
            gt: 0,
          },
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be checked');
      }

      return timeslot;
    } catch (error) {
      this.logger.error('Timeslot could not be checked', error.stack);
      throw error;
    }
  }

  async createTimeslot(dto: CreateTimeslotDto): Promise<TimeslotModel> {
    try {
      const timeslot = await this.prisma.timeslots.create({
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          currentCapacity: dto.currentCapacity,
          orderCount: dto.orderCount,
          isAvailable: dto.isAvailable,
          timezone: dto.timezone,
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be created');
      }

      return timeslot;
    } catch (error) {
      this.logger.error('Timeslot could not be created', error.stack);
      throw error;
    }
  }

  async getAllTimeslots(): Promise<TimeslotModel[]> {
    try {
      const timeslots = await this.prisma.timeslots.findMany();

      if (!timeslots) {
        throw new BadRequestException('Timeslots could not be retrieved');
      }

      return timeslots;
    } catch (error) {
      this.logger.error('Timeslots could not be retrieved', error.stack);
      throw error;
    }
  }

  async getTimeslotById(timeslotId: string): Promise<TimeslotModel> {
    try {
      const timeslot = await this.prisma.timeslots.findUnique({
        where: {
          id: timeslotId,
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be retrieved');
      }

      return timeslot;
    } catch (error) {
      this.logger.error('Timeslot could be retrieved', error.stack);
      throw error;
    }
  }

  async updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<TimeslotModel> {
    try {
      const timeslotExists = await this.prisma.timeslots.findUnique({
        where: {
          id: timeslotId,
        },
      });

      if (!timeslotExists) {
        throw new NotFoundException('Timeslot not found');
      }

      const timeslot = await this.prisma.timeslots.update({
        where: {
          id: timeslotId,
        },
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          timezone: dto.timezone,
          orderCount: dto.orderCount,
          currentCapacity: dto.currentCapacity,
          isAvailable: dto.isAvailable,
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be updated');
      }

      return timeslot;
    } catch (error) {
      this.logger.error('Timeslot could not be updated', error.stack);
      throw error;
    }
  }

  async deleteTimeslotById(timeslotId: string): Promise<TimeslotModel> {
    try {
      const timeslot = await this.prisma.timeslots.delete({
        where: {
          id: timeslotId,
        },
      });

      if (!timeslot) {
        throw new BadRequestException('Timeslot could not be deleted');
      }

      return timeslot;
    } catch (error) {
      this.logger.error('Timeslot could not be deleted', error.stack);
      throw error;
    }
  }

  async deleteAllTimeslots(): Promise<TimeslotModel[] | boolean> {
    try {
      const timeslots = await this.prisma.timeslots.deleteMany();

      if (!timeslots) {
        throw new BadRequestException('Timeslots could not be cleared');
      }

      return true;
    } catch (error) {
      this.logger.error('Timeslots could not be deleted', error.stack);
      throw error;
    }
  }

  // async getConfirmedOrder(orderId: string): Promise<TimeslotModel> {
  //   try {
  //     throw new Error('Method not implemented.');
  //   } catch (error) {
  //     this.logger.error('Order could not be confirmed', error.stack);
  //     throw error;
  //   }
  // }
}
