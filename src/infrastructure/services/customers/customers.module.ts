import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CustomerService } from './customers.service';

@Module({
  imports: [PrismaModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
