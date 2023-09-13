import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import {
  tokens,
  userFixtures,
} from '../../../../../src/module/order/interface/__test__/order.fixtures';
import { User } from '../../../../../src/module/user/domain/user.entity';
import { productFixture } from './product.fixture';
import { Product } from '../../domain/product.entity';
import { UpdateProductDto } from '../../application/dto';

describe('Products', () => {
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
      .send({ fixtures: productFixture, entity: Product.name });
  });

  describe('GET /product', () => {
    it('Should get all products', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/product')
        .expect(200);
      expect(body).toHaveLength(2);
    });
  });

  describe('POST /product/create', () => {
    it('Should create product as admin', async () => {
      const newProduct = {
        title: 'someTitle',
        description: 'someDescription',
        category: 'someCategory',
        price: 200,
        stock: 2323,
        image: 'someImage',
      };

      await request(app.getHttpServer())
        .post('/product/create')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newProduct)
        .expect(201);
    });

    it("Shouldn't create product as normal user", async () => {
      const newProduct = {
        ...productFixture[0],
      };
      await request(app.getHttpServer())
        .post('/product/create')
        .send(newProduct)
        .expect(401);
    });
  });

  describe('GET /product/:id', () => {
    it('Should get product by ID', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/product/1')
        .expect(200);
      expect(body).toHaveProperty('id', 1);
    });

    it('Should get not found product by ID', async () => {
      await request(app.getHttpServer()).get('/product/999').expect(404);
    });
  });

  describe('PUT /product/:id', () => {
    it('Should modify product being admin', async () => {
      const updateProductDto: UpdateProductDto = {
        price: 999,
      };
      const { body } = await request(app.getHttpServer())
        .put('/product/2')
        .send(updateProductDto)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
      expect(body).toHaveProperty('price', 999);
    });

    it("shouldn't modify product being normal user", async () => {
      const updateProductDto: UpdateProductDto = {
        price: 999,
      };
      await request(app.getHttpServer())
        .put('/product/2')
        .send(updateProductDto)
        .expect(401);
    });
  });

  describe('DELETE /product/:id', () => {
    it('Should delete product as admin', async () => {
      await request(app.getHttpServer())
        .delete('/product/1')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
