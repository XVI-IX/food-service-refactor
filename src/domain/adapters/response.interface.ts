export interface IResponse<T = any> {
  status?: boolean;
  message?: string | null;
  data?: T | T[];
  page?: number;
}
