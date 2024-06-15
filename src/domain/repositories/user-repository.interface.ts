import { VerifyEmailDto } from 'src/infrastructure/common/dto';
import { UserModel } from '../models/user.model';

export interface ICreateUserData {
  userName: string;
  phone: string;
  firstName: string;
  otherName?: string;
  lastName: string;
  email: string;
  password: string;
  google_id?: string;
  role: any;
  verificationToken: string;
}

export interface IVerifyEmail {
  email: string;
  token: string;
}

export interface IResetPasswordData {
  email: string;
  hash: string;
}

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserModel | null>;
  createUser(dto: ICreateUserData): Promise<UserModel | null>;
  verifyEmail(dto: VerifyEmailDto): Promise<UserModel | null>;
  updateResetToken(
    email: string,
    resetToken: string,
  ): Promise<UserModel | null>;
  updateVerificationToken(email: string): Promise<UserModel | null>;
  updateUserPassword(dto: IResetPasswordData): Promise<UserModel | null>;
  revokeToken(token: string): Promise<any>;
  checkRevokedToken(token: string): Promise<any>;
  changeUserRole(userId: string, role: string): Promise<UserModel>;
}
