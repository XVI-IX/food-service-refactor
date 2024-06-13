export class UseCaseProxy<T> {
  constructor(private readonly usecase: T) {}

  getInstance(): T {
    return this.usecase();
  }
}
