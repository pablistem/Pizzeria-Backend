import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './domain/option.entity';
import { OptionController } from './option.controller';
import { OptionService } from './service/option.service';
import { OptionRepository } from './infrastucture/option.respositoy';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
})
export class OptionModule {}
