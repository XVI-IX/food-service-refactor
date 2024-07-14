import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class GetAllTimeslotsUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async getAllTimeslots(): Promise<IUseCaseResponse> {
    const timeslots = await this.timeslotRepository.getAllTimeslots();

    return {
      data: timeslots,
    };
  }
}
