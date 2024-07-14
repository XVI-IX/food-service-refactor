import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { UpdateTimeslotDto } from 'src/infrastructure/common/dto';
import { TimeslotRepository } from 'src/infrastructure/repositories/timeslot.repository';

export class UpdateTimeslotUseCase {
  constructor(private readonly timeslotRepository: TimeslotRepository) {}

  async updateTimeslot(
    timeslotId: string,
    dto: UpdateTimeslotDto,
  ): Promise<IUseCaseResponse> {
    const timeslot = await this.timeslotRepository.updateTimeslot(
      timeslotId,
      dto,
    );

    return {
      data: timeslot,
    };
  }
}
