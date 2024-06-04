import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [PrismaModule],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
