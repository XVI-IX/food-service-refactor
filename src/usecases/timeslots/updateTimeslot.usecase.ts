import { IUseCaseResponse } from 'src/domain/adapters/usecase.response';
import { ITimeslotRepository } from 'src/domain/repositories/timeslot-repository.interface';
import { UpdateTimeslotDto } from 'src/infrastructure/common/dto';

export class UpdateTimeslotUseCase {
  constructor(private readonly timeslotRepository: ITimeslotRepository) {}

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
