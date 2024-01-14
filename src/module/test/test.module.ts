import { Module } from '@nestjs/common';
import { TestService } from './application/service/test.service';

@Module({
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
