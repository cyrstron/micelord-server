import { UsersModel } from "../../../models";
import { FacebookAuthUtils } from "../../../utils/facebook-auth";

export class FacebookAuthStrategy {
  constructor(
    private users: UsersModel,
    private facebookAuth: FacebookAuthUtils,
  ) {}

  async validate({
      email, 
      facebookToken
    }: {
      email: string,
      facebookToken: string
    }) {    
    const user = await this.users.findByFacebookToken(email, facebookToken);

    if (!user) {
      throw new Error('Invalid creadentials');
    }

    const {
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
    email,
    facebookToken
  }: {
    name: string,
    email: string,
    facebookToken: string,
  }) {
    const isTokenValid = await this.facebookAuth.validateToken(facebookToken);

    if (!isTokenValid) throw new Error('Invalid creadentials');

    return {
      name,
      email,
      facebook: true as true,
    }
  }
}