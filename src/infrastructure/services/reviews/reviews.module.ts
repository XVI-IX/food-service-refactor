import { Module } from 'module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class ReviewsModule {}
