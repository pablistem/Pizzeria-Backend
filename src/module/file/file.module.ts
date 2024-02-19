import { Module } from '@nestjs/common';
import { ImageService } from './application/service/image.service';
import { SharpService } from 'nestjs-sharp';

@Module({
  imports: [],
  providers: [ImageService, SharpService],
  exports: [ImageService],
})
export class FileModule {}
