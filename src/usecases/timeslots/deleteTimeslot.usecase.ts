import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class DeleteTimeslotByIdUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async deleteTimeslotById(timeslotId: string): Promise<IUseCaseResponse> {
    const timeslot =
      await this.timeslotRepository.deleteTimeslotById(timeslotId);

    return {
      data: timeslot,
    };
  }
}
