import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../../../src/app.module';
import { loadFixtures } from '../../../../../src/common/fixtures/loader';
import { tokens } from '../../../../../src/common/fixtures/user';
import { Category } from '../../application/domain/category.entity';
import { createCategoryDto } from '../../application/dto/create-category.dto';

describe('Category', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
    await loadFixtures(app);
  });

  describe('GET /category', () => {
    it('Should get all categories', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/category')
        .auth(tokens.adminUserToken, { type: 'bearer' });
      expect(body).toHaveLength(3);
    });
  });

  describe('POST /category', () => {
    it('Should create category as admin ', async () => {
      const newCategory: createCategoryDto = { name: 'newCategory' };
      const { body } = await request(app.getHttpServer())
        .post('/category/create')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newCategory)
        .expect(201);
      expect(body).toHaveProperty('id', 4);
    });

    it('Should not create category as user ', async () => {
      const newCategory: createCategoryDto = { name: 'newCategory' };
      const { body } = await request(app.getHttpServer())
        .post('/category/create')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newCategory)
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
