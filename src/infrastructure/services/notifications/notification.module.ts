import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationService } from './notification.service';
import { RepositoriesModule } from '../../repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
