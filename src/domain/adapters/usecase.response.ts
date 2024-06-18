export interface IUseCaseResponse<T = any, U = any> {
  data?: T;
  meta?: U;
  token?: string;
}
