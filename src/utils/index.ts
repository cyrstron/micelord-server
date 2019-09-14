import { EncryptUtils, EncryptOptions, HashedPassword } from "./crypto";
import { FsUtils } from "./fs";
import { createJwtUtils, JwtOptions, JwtUtils } from "./jwt";

export interface Utils {
  encrypt: EncryptUtils;
  fs: FsUtils;
  jwt: JwtUtils
}

export interface UtilsConfig {
  encrypt: EncryptOptions;
  jwt: JwtOptions;
}

export async function createUtils(config: UtilsConfig): Promise<Utils> {
  const fs = new FsUtils();

  const jwt = await createJwtUtils(fs, config.jwt);

  return {
    encrypt: new EncryptUtils(config.encrypt),
    jwt,
    fs,
  }
}

export {EncryptUtils, HashedPassword, JwtUtils};