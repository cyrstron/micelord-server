import { HttpUtils } from "./http";

export interface FacebookValidationPayload {
  data: {
    app_id: string;
    type: string;
    application: string;
    data_access_expires_at: number;
    expires_at: number;
    is_valid: boolean;
    scopes: string[];
    user_id: string;
  }
}

export interface FacebookAuthConfig {
  appId: string;
  appSecret: string;
};

export class FacebookAuthUtils {
  authUrl = 'https://graph.facebook.com';
  appId: string;
  appSecret: string;

  constructor(
    private http: HttpUtils,
    {appId, appSecret}: FacebookAuthConfig,
  ) {
    this.appId = appId;
    this.appSecret = appSecret;
  }

  async validateToken(token: string) {
    const {data} = await this.http.get<FacebookValidationPayload>(
      `${this.authUrl}/debug_token?input_token=${token}&access_token=${this.appId}|${this.appSecret}`
    );

    return data.app_id = this.appId;
  }
}