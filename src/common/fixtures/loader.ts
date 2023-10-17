import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Item } from 'src/module/item/domain/item.entity';
import { Order } from 'src/module/order/domain/order.entity';
import { Product } from 'src/module/product/domain/product.entity';
import { User } from 'src/module/user/domain/user.entity';
import { itemFixtures } from './item';
import { orderFixtures } from './order';
import { userFixtures } from './user';
import { productFixtures } from './product';
import { Category } from 'src/module/category/application/domain/category.entity';
import { categoryFixture } from './category';
import { optionsFixtures } from './option';
import { Option } from 'src/module/option/domain/option.entity';

export const loadFixtures = async (app: INestApplication) => {
  await request(app.getHttpServer())
    .post('/loader')
    .send({ fixtures: userFixtures, entity: User.name });

    await request(app.getHttpServer())
    .post('/loader')
    .send({fixtures: optionsFixtures, entity: Option.name})

  await request(app.getHttpServer())
    .post('/loader')
    .send({ fixtures: categoryFixture, entity: Category.name });

  await request(app.getHttpServer())
    .post('/loader')
    .send({ fixtures: productFixtures, entity: Product.name });

  await request(app.getHttpServer())
    .post('/loader')
    .send({ fixtures: orderFixtures, entity: Order.name });

  await request(app.getHttpServer())
    .post('/loader')
    .send({ fixtures: itemFixtures, entity: Item.name });
};
