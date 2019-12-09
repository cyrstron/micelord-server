import { HttpUtils } from "./http";

export interface DecodedGoogleUser {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: string;
  exp: string;
  jti: string;
  alg: string;
  kid: string;
  typ: string;
}

export class GoogleAuthUtils {
  oauthUrl = 'https://oauth2.googleapis.com';

  constructor(
    private http: HttpUtils
  ) {}

  decodeToken(googleToken: string) {
    return this.http.get<DecodedGoogleUser>(`${this.oauthUrl}/tokeninfo?id_token=${googleToken}`);
  }
}