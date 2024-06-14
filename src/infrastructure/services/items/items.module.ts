import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ItemService } from './items.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
