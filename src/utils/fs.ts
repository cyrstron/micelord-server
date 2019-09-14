import fs from 'fs';

export class FsUtils {
  readFile(path: string): Promise<Buffer> {
    return new Promise((res, rej) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      })
    })
  }

  async readFileAsUtf8(path: string): Promise<string> {
    const data = await this.readFile(path);

    return data.toString('utf8');
  }
}