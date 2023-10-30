import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { UpdateProductDto } from '../../application/dto';
import { loadFixtures } from 'src/common/fixtures/loader';
import { tokens } from './../../../../../src/common/fixtures/user';
import { productFixtures } from '../../../../../src/common/fixtures/product';
import { category1 } from '../../../../../src/common/fixtures/category';
import { Product } from '../../domain/product.entity';

describe('Products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /product', () => {
    it('Should get all products', async () => {
      const response = await request(app.getHttpServer())
        .get('/product')
        .expect(200);

      const body: Product[] = response.body;
      expect(body).toHaveLength(3);
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

  describe('POST /product', () => {
    it('Should create product as admin', async () => {
      const newProduct = {
        title: 'someTitle',
        description: 'someDescription',
        category: category1,
        price: 200,
        stock: 2323,
        image: 'someImage',
      };

      await request(app.getHttpServer())
        .post('/product')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newProduct)
        .expect(201);
    });

    it("Shouldn't create product as normal user", async () => {
      const newProduct = {
        ...productFixtures[0],
      };
      await request(app.getHttpServer())
        .post('/product')
        .send(newProduct)
        .expect(401);
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

    it("Shouldn't modify product being normal user", async () => {
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
        .delete('/product/4')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
