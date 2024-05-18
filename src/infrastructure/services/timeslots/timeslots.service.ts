import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { timeslots } from '@prisma/client';
import { ServiceInterface } from 'src/domain/adapters';
import { UpdateTimeslotDto } from 'src/infrastructure/common/dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class TimeslotService {
  private readonly logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TimeslotService.name);
  }

  async getAllTimeslots(): Promise<ServiceInterface<timeslots[]>> {
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

  async getTimeslotById(
    timeslotId: number,
  ): Promise<ServiceInterface<timeslots>> {
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
    timeslotId: number,
    dto: UpdateTimeslotDto,
  ): Promise<ServiceInterface<timeslots>> {
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
        throw new UnprocessableEntityException('Timeslot could not be updated');
      }

      return {
        data: timeslot,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
