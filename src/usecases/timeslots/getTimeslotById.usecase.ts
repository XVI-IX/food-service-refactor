import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';

export class GetTimeslotByIdUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

  async getTimeslotById(timeslotId: string): Promise<IUseCaseResponse> {
    const timeslot = await this.timeslotRepository.getTimeslotById(timeslotId);

    return {
      data: timeslot,
    };
  }
}
