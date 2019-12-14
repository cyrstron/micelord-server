import { UsersModel } from "../../../models";
import { Utils } from "../../../utils";
import { GoogleAuthStrategy } from "./google";
import { DefaultAuthStrategy } from "./default";
import { FacebookAuthStrategy } from "./facebook";
import { UserSchema } from "../../../models/users";
import { SignInPayload, NewUserPayload, AuthStrategyType} from "../";

export type AuthStrategies = {
  [key in AuthStrategyType]: AuthStrategy;
}

interface AuthTokenPayload {
  _id: string,
  email: string,
  name: string,
}

export interface AuthStrategy {
  validate: (signInPayload: SignInPayload) => Promise<AuthTokenPayload>;
  create: (signUpPayload: NewUserPayload) => Promise<Omit<UserSchema, 'role'>>;
}

export function createAuthStrategies(
  users: UsersModel, 
  utils: Utils
): AuthStrategies {
  return {
    google: new GoogleAuthStrategy(users, utils.googleAuth),
    facebook: new FacebookAuthStrategy(users, utils.facebookAuth),
    default: new DefaultAuthStrategy(users, utils.encrypt),
  };
}