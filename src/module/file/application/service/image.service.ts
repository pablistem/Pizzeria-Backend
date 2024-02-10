import { Injectable } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import { extname, join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  constructor(private readonly sharpService: SharpService) {}

  rename(originalName: string): string {
    const ext = extname(originalName);
    return `${Date.now()}${ext}`;
  }

  async save(path: string, imageBuffer: Buffer) {
    const resize = await this.resize(imageBuffer, 500);
    this.verifyFolder();
    fs.writeFileSync(path, resize);
  }

  setPath(imageFileName: string): string {
    const imagePath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'public',
      imageFileName,
    );
    return imagePath;
  }

  verifyFolder() {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
  }

  async resize(imageBuffer: Buffer, width: number): Promise<Buffer> {
    const resizedImage = await this.sharpService
      .edit(imageBuffer)
      .resize({
        width,
      })
      .toBuffer();

    return resizedImage;
  }

  async delete(path: string) {
    try {
      fs.unlinkSync(path);
    } catch (error) {}
  }
}
