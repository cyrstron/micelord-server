import { UsersModel } from "../models";
import { UserPayload } from "./auth-service";

export class UsersService {
  constructor(
    private users: UsersModel,
  ) {}

  async getUserById(id: string): Promise<UserPayload | undefined> {
    const user = await this.users.findById(id);

    if (!user) return;

    const {
      hash,
      salt,
      iterations,
      ...userPayload
    } = user;

    return userPayload;
  }
}