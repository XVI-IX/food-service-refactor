import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';

export class DeleteAllTimeslotsUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

  async deleteAllTimeslots(): Promise<IUseCaseResponse> {
    const timeslots = await this.timeslotRepository.deleteAllTimeslots();

    return {
      data: timeslots,
    };
  }
}
