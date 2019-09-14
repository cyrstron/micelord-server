import { FsUtils } from "../fs";
import { JwtUtils, JwtSettings } from "./jwt";

export type JwtOptions = Omit<JwtSettings, 'privateKey' | 'publicKey'> & {
  privateKeyPath: string;
  publicKeyPath: string;
}

export async function createJwtUtils(fs: FsUtils, {
  privateKeyPath,
  publicKeyPath,
}: JwtOptions): Promise<JwtUtils> {
  const [privateKey, publicKey] = await Promise.all([
    fs.readFileAsUtf8(privateKeyPath),
    fs.readFileAsUtf8(publicKeyPath),
  ]);

  return new JwtUtils({
    privateKey,
    publicKey,
  });
}

export {JwtUtils};