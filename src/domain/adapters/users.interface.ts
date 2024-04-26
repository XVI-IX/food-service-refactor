export interface IUser {
  id: number;
  user_name: string;
  email: string;
  phone_number: string;
  password: string;
  google_id: string;
  role: string;
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
  created_at: string;
  updated_at: string;
  orders: any[];
}
