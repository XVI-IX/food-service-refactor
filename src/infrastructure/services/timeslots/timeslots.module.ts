import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { TimeslotService } from './timeslots.service';

@Module({
  imports: [PrismaModule],
  providers: [TimeslotService],
  exports: [TimeslotService],
})
export class TimeslotModule {}
