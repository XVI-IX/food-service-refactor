import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
})
export class GeneralUseCaseProxyModule {
  static register(): DynamicModule {
    return {
      module: GeneralUseCaseProxyModule,
      providers: [],
    };
  }
}
