import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTimeslotDto, UpdateTimeslotDto } from '../../common/dto';
import { HttpResponse } from '../../common/helpers/response.helper';
import { TimeslotService } from '../../services/timeslots/timeslots.service';

@Controller('timeslots')
export class TimeslotController {
  constructor(private readonly timeslotService: TimeslotService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createTimeslot(@Body() dto: CreateTimeslotDto) {
    const response = await this.timeslotService.createTimeslot(dto);
    return HttpResponse.send('Timeslot created', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTimeslots() {
    const response = await this.timeslotService.getAllTimeslots();
    return HttpResponse.send('Timeslots retrieved', response);
  }

  @Get('/:timeslotId')
  @HttpCode(HttpStatus.OK)
  async getTimeslotById(@Param('timeslotId') timeslotId: string) {
    const response = await this.timeslotService.getTimeslotById(timeslotId);
    return HttpResponse.send('Timeslot retrieved', response);
  }

  @Put('/:timeslotId')
  @HttpCode(HttpStatus.OK)
  async updateTimeslot(
    @Param('timeslotId') timeslotId: string,
    @Body() dto: UpdateTimeslotDto,
  ) {
    const response = await this.timeslotService.updateTimeslot(timeslotId, dto);
    return HttpResponse.send('Timeslot updated', response);
  }

  @Delete('/:timeslotId')
  @HttpCode(HttpStatus.OK)
  async DeleteTimeslot(@Param('timeslotId') timeslotId: string) {
    const response = await this.timeslotService.deleteTimeslotById(timeslotId);
    return HttpResponse.send('Deleted timeslot successfully', response);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAllTimeslots() {
    const response = await this.timeslotService.deleteAllTimeslots();
    return HttpResponse.send('All timeslots deleted', response);
  }
}
