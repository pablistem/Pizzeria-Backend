import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    UserModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
