import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { CreateTimeslotDto } from 'src/infrastructure/common/dto';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class CreateTimeSlotUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async createTimeslot(dto: CreateTimeslotDto): Promise<IUseCaseResponse> {
    const timeslot = await this.timeslotRepository.createTimeslot(dto);

    return {
      data: timeslot,
    };
  }
}
