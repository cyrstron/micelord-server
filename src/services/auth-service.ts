import { UsersModel } from "../models";
import { EncryptUtils, JwtUtils, HashedPassword } from "../utils";
import { UserSchema } from "../models/users";

export interface NewUser {
  name: string;
  password: string;
  email: string;
}

export type UserPayload = Omit<UserSchema, keyof HashedPassword | '_id'> & {
  _id: string;
};

export class AuthService {
  constructor(
    private encrypt: EncryptUtils,
    private jwt: JwtUtils,
    private users: UsersModel,
  ) {}

  async signUp({password, ...user}: NewUser): Promise<void> {
    const {hash, salt, iterations} = await this.encrypt.excryptPassword(password);

    await this.users.add({
      ...user,
      hash,
      salt,
      iterations
    });
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new Error('No user found');
    }

    const {
      hash,
      salt,
      iterations,
      ...userData
    } = user;

    const isValid = await this.encrypt.validatePassword(password, {      
      hash,
      salt,
      iterations,
    });

    if (!isValid) {
      throw new Error('Password is not valid');
    }

    const token = await this.jwt.sign(userData);

    return token;
  }

  async decodeToken(token: string): Promise<UserPayload> {
    const payload = await this.jwt.verify<UserPayload>(token);

    return payload;
  }
}