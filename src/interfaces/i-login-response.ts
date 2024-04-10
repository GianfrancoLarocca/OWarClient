export interface ILoginResponse {
  username: string;
  role: string;
  token: string;
  type: string;
  exp: Date;
}
