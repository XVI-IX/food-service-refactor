import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { SettingsService } from './settings.service';

@Module({
  imports: [PrismaModule],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
