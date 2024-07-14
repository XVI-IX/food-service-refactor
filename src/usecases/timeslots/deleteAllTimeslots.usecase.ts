import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class DeleteAllTimeslotsUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async deleteAllTimeslots(): Promise<IUseCaseResponse> {
    const timeslots = await this.timeslotRepository.deleteAllTimeslots();

    return {
      data: timeslots,
    };
  }
}
