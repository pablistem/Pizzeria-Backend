import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';

import { orderFixtures, userFixtures } from './order.fixtures';
import { User } from '../../../user/domain/user.entity';
import { Order } from '../../domain/order.entity';

describe('Order', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    await request(app.getHttpServer())
      .post('/loader')
      .send({ fixtures: userFixtures, entity: User.name });

    await request(app.getHttpServer())
      .post('/loader')
      .send({ fixtures: orderFixtures, entity: Order.name });
  });
  it('Should get all orders', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/order')
      .expect(200);
    expect(body).toHaveLength(orderFixtures.length);
  });

  afterAll(async () => {
    await app.close();
  });
});
