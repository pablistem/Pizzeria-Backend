import { Module } from '@nestjs/common';
import { DbLoaderRepository } from './db-loader/repository.loader';
import { DBLoaderController } from './DBLoaderController';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [DBLoaderController],
  providers: [DbLoaderRepository],
})
export class CommonModule {}
