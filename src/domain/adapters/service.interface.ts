export interface ServiceInterface<T = any> {
  message?: string;
  status?: boolean;
  data?: T;
  token?: string;
  page?: number;
}
