import { Body, Controller, Post } from '@nestjs/common';
import { DbLoaderRepository } from './db-loader/repository.loader';

@Controller('loader')
export class DBLoaderController {
  constructor(private readonly dbLoader: DbLoaderRepository) {}

  @Post()
  async loader(@Body() body: { fixtures: any[]; entity: string }) {
    await this.dbLoader.loadFixture(body.fixtures, body.entity);
  }
}
