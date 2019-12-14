import { UsersModel } from "../../models";
import { Utils, HashedPassword } from "../../utils";
import { createAuthStrategies } from "./strategies";
import { AuthService } from "..";
import { UserSchema } from "../../models/users";

export interface NewDefaultUser {
  name: string;
  password: string;
  email: string;
}

export interface NewGoogleUser {
  name: string;
  googleToken: string;
}

export interface NewFacebookUser {
  name: string;
  email: string;
  facebookToken: string;
}

export type NewUserPayload = NewDefaultUser | NewGoogleUser | NewFacebookUser;

export interface DefaultSignInPayload {
  password: string;
  email: string;
}

export interface GoogleSignInPayload {
  googleToken: string;
}

export interface FacebookSignInPayload {
  facebookToken: string;
  email: string;
}

export type SignInPayload = DefaultSignInPayload | GoogleSignInPayload | FacebookSignInPayload;

export type UserPayload = Omit<UserSchema, keyof HashedPassword | '_id' | 'google' | 'facebook'> & {
  _id: string;
};

export type AuthStrategyType = 'default' | 'google' | 'facebook';

export function createAuthService(users: UsersModel, utils: Utils) {
  const strategies = createAuthStrategies(users, utils);

  return new AuthService(users, strategies, utils);
}