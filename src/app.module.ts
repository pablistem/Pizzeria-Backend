import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../ormconfig';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './module/order/order.module';
import { CommonModule } from './common/common.module';
import { ItemModule } from './module/item/item.module';
import { CategoryModule } from './module/category/category.module';
import { OptionModule } from './module/option/option.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    UserModule,
    AuthModule,
    OptionModule,
    ProductModule,
    OrderModule,
    CommonModule,
    ItemModule,
    CategoryModule,
  ],
})
export class AppModule {}
