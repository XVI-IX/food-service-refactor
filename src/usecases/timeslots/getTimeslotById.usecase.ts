import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class GetTimeslotByIdUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async getTimeslotById(timeslotId: string): Promise<IUseCaseResponse> {
    const timeslot = await this.timeslotRepository.getTimeslotById(timeslotId);

    return {
      data: timeslot,
    };
  }
}
