import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../../../../app.module';

import { Order, OrderStatus } from '../../domain/order.entity';
import { UpdateOrderDto } from '../../application/dto/update-order.dto';
import { loadFixtures } from 'src/common/fixtures/loader';
import { orderFixtures } from 'src/common/fixtures/order';
import { tokens } from 'src/common/fixtures/user';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { product3 } from 'src/common/fixtures/product';

describe('Order', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /order', () => {
    it('Should get all orders as admin', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/order')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
      console.log(body[0]);
      expect(body).toHaveLength(orderFixtures.length);
    });

    it('Should get all orders as normal user', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/order')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
      expect(body).toHaveLength(2);
    });
  });

  describe('GET /order/:id', () => {
    it('Should get order as admin', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/order/1`)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
      expect(body).toHaveProperty('id', 1);
    });

    it('Should get order as normal user', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/order/2`)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
      expect(body).toHaveProperty('id', 2);
    });

    it('Should throw if order does not exist as admin', async () => {
      await request(app.getHttpServer())
        .get(`/order/999`)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(404);
    });

    it('Should throw if order does not exist as admin', async () => {
      await request(app.getHttpServer())
        .get(`/order/1000`)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });
  });

  describe('POST /order', () => {
    it('Should create order as admin', async () => {
      const newOrder: CreateOrderDto = {
        items: [{ product: product3, quantity: 100 }],
      };
      const { body } = await request(app.getHttpServer())
        .post('/order')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newOrder)
        .expect(201);
      expect(body).toHaveProperty('id', 3);
    });
    it('Should create order as normal user', async () => {
      const newOrder = {
        ...orderFixtures[1],
      } as Order;
      const { body } = await request(app.getHttpServer())
        .post('/order')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newOrder)
        .expect(201);
      expect(body).toHaveProperty('id', 4);
    });
  });

  describe('PUT /order/:id', () => {
    it('Should update order as admin despite being delivered', async () => {
      const updatedOrderDto: UpdateOrderDto = {
        status: OrderStatus.pending,
      };
      const { body } = await request(app.getHttpServer())
        .put(`/order/2`)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(updatedOrderDto)
        .expect(200);
      expect(body).toHaveProperty('status', updatedOrderDto.status);
    });

    it('Should update order as normal user', async () => {
      const updatedOrderDto: UpdateOrderDto = {
        status: OrderStatus.canceled,
      };
      const { body } = await request(app.getHttpServer())
        .put(`/order/2`)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(updatedOrderDto)
        .expect(200);
      expect(body).toHaveProperty('status', updatedOrderDto.status);
    });
  });

  describe('DELETE /order/:id', () => {
    it('Should delete order as admin', async () => {
      await request(app.getHttpServer())
        .delete(`/order/3`)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
    });
    it('Should delete order as normal user', async () => {
      await request(app.getHttpServer())
        .delete(`/order/4`)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
    });
    it('Should throw if order does not exist as admin', async () => {
      await request(app.getHttpServer())
        .delete(`/order/999`)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(404);
    });
    it('Should throw if order does not exist as normal user', async () => {
      await request(app.getHttpServer())
        .delete(`/order/1000`)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
