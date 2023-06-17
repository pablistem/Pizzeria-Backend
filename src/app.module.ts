import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
})
export class AppModule {}
