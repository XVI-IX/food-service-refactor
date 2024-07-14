import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SettingsService } from './settings.service';
import { RepositoriesModule } from '../../repositories/repositories.module';

@Module({
  imports: [PrismaModule, RepositoriesModule],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
