export interface IEmail {
  to: string;
  data: {
    userName?: string;
    token?: string;
    tokenExpiration?: string;
  };
}
