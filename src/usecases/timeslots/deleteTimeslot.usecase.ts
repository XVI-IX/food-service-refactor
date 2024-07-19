import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';

export class DeleteTimeslotByIdUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

  async deleteTimeslotById(timeslotId: string): Promise<IUseCaseResponse> {
    const timeslot =
      await this.timeslotRepository.deleteTimeslotById(timeslotId);

    return {
      data: timeslot,
    };
  }
}
