import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';
import { CreateTimeslotDto } from 'src/infrastructure/common/dto';

export class CreateTimeSlotUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

  async createTimeslot(dto: CreateTimeslotDto): Promise<IUseCaseResponse> {
    const timeslot = await this.timeslotRepository.createTimeslot(dto);

    return {
      data: timeslot,
    };
  }
}
