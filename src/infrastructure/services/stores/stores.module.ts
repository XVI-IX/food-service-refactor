import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StoreService } from './stores.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
