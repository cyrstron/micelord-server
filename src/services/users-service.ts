import { UsersModel } from "../models";
import { UserPayload } from "./auth-service";

export class UsersService {
  constructor(
    private users: UsersModel
  ) {}

  async getUserByGoogleToken(googleToken: string) {
    return this.users.findByGoogleToken(googleToken);
  }

  async getUserByFacebookAuth(email: string, token: string) {
    return this.users.findByFacebookToken(email, token);
  }

  async getUserById(id: string): Promise<UserPayload | undefined> {
    const user = await this.users.findById(id);

    if (!user) return;

    const {
      _id,
      email,
      name,
      role,
    } = user;

    return {
      _id,
      email,
      name,
      role     
    };
  }
}