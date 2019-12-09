import { UsersModel } from "../../models";
import { EncryptUtils, JwtUtils, HashedPassword, Utils } from "../../utils";
import { UserSchema } from "../../models/users";
import { AuthStrategies } from "./strategies";

interface NewDefaultUser {
  name: string;
  password: string;
  email: string;
}

interface NewGoogleUser {
  name: string;
  googleToken: string;
}

export type NewUser = NewDefaultUser | NewGoogleUser;

export type SignInPayload = {
  password: string;
  email: string;
} | {
  googleToken: string;
}

export type UserPayload = Omit<UserSchema, keyof HashedPassword | '_id'> & {
  _id: string;
};

export class AuthService {
  encrypt: EncryptUtils;
  jwt: JwtUtils;

  constructor(
    private users: UsersModel,
    private strategies: AuthStrategies, 
    {
      encrypt,
      jwt
    }: Utils
  ) {
    this.encrypt = encrypt;
    this.jwt = jwt;
  }

  async signUp(user: NewUser): Promise<void> {
    await this.users.validateUser(user);

    let userPayload: UserSchema;

    if ('googleToken' in user) {
      userPayload = await this.strategies.googleAuth.create(user);
    } else {
      userPayload = await this.strategies.default.create(user);
    }

    await this.users.add(userPayload);
  }

  async signIn(signInPayload: SignInPayload): Promise<string> {
    let userData: any;

    if ('googleToken' in signInPayload) {
      const {googleToken} = signInPayload;

      userData = await this.strategies.googleAuth.validate(googleToken);
    } else {      
      const {email, password} = signInPayload;

      userData = await this.strategies.default.validate(email, password);
    }

    const token = await this.jwt.sign(userData);

    return token;
  }

  validateEmail(email: string): Promise<void> {
    return this.users.validateEmail(email);
  } 

  validateName(name: string): Promise<void> {
    return this.users.validateName(name);
  } 

  async decodeToken(token: string): Promise<UserPayload> {
    const payload = await this.jwt.verify<UserPayload>(token);

    return payload;
  }
}