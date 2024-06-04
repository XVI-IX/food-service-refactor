import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ServiceInterface } from 'src/domain/adapters';
import { ITimeslotService } from 'src/domain/adapters/timeslot.interface';
import {
  CreateTimeslotDto,
  UpdateTimeslotDto,
} from 'src/infrastructure/common/dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TimeslotService implements ITimeslotService {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TimeslotService.name);
  }

  async createTimeslot(dto: CreateTimeslotDto): Promise<ServiceInterface> {
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
        throw new InternalServerErrorException('Timeslot could not be created');
      }

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
      const timeslots = await this.prisma.timeslots.findMany();

      if (!timeslots) {
        throw new UnprocessableEntityException(
          'Timeslots could not be retrieved',
        );
      }

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
      const timeslot = await this.prisma.timeslots.findUnique({
        where: {
          id: timeslotId,
        },
      });

      if (!timeslot) {
        throw new InternalServerErrorException(
          'Timeslot could not be retrieved',
        );
      }

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
      const timeslot = await this.prisma.timeslots.delete({
        where: {
          id: timeslotId,
        },
      });

      if (!timeslot) {
        throw new UnprocessableEntityException('Timeslot could not be deleted');
      }

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
      const timeslots = await this.prisma.timeslots.deleteMany();

      if (!timeslots) {
        throw new InternalServerErrorException(
          'Timeslots could not be cleared',
        );
      }

      return {
        data: null,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // private createDynamicTimeslot(): Promise<ServiceInterface> {
  //   try {
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }
}
