import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';

export class GetAllTimeslotsUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

  async getAllTimeslots(): Promise<IUseCaseResponse> {
    const timeslots = await this.timeslotRepository.getAllTimeslots();

    return {
      data: timeslots,
    };
  }
}
