import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TimeslotService } from './timeslots.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [TimeslotService],
  exports: [TimeslotService],
})
export class TimeslotModule {}
