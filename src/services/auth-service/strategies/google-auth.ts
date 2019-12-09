import { UsersModel } from "../../../models";
import { GoogleAuthUtils } from "../../../utils";

export class GoogleAuthStrategy {
  constructor(
    private users: UsersModel,
    private googleAuth: GoogleAuthUtils,
  ) {}

  async validate(googleToken: string) {    
    const user = await this.users.findByGoogleToken(googleToken);

    if (!user) {
      throw new Error('Invalid creadentials');
    }

    const {
      email,
      name, 
      _id
    } = user;

    return {
      email,
      name, 
      _id      
    };
  }

  async create({
    name,
    googleToken
  }: {
    name: string,
    googleToken: string,
  }) {
    const {email} = await this.googleAuth.decodeToken(googleToken);

    return {
      name,
      email,
      google: true as true,
    }
  }
}