import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import product service
// import product controller
// import product repository
// import product entity
import { Option } from './domain/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [
    // product controller
  ],
  providers: [
    // product service
    // product repository
  ],
})
export class OptionModule {}
