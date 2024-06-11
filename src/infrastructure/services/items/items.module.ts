import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ItemService } from './items.service';

@Module({
  imports: [PrismaModule],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
