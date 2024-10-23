import { Request } from "express";
export interface IUser {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: Omit<IUser, "password">;
}

export interface IAuthRequest extends Request {
  user?: IUser;
}
