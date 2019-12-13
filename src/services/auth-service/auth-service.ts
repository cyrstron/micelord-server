import { UsersModel } from "../../models";
import { EncryptUtils, JwtUtils, Utils } from "../../utils";
import { UserSchema } from "../../models/users";
import { AuthStrategies } from "./strategies";
import { NewUserPayload, AuthStrategyType, SignInPayload, UserPayload } from "./";

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

  async signUp(
    user: NewUserPayload,
    strategyType: AuthStrategyType
  ): Promise<void> {
    await this.users.validateUser(user);

    let userPayload: UserSchema;

    await this.strategies[strategyType].create(user);

    await this.users.add(userPayload);
  }

  async signIn(
    signInPayload: SignInPayload, 
    strategyType: AuthStrategyType
  ): Promise<string> {    
    const userData = await this.strategies[strategyType].validate(signInPayload);

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