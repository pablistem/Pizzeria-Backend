import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../../../src/app.module';
import { loadFixtures } from '../../../../../src/common/fixtures/loader';
import { tokens } from '../../../../../src/common/fixtures/user';
import { createCategoryDto } from '../../application/dto/create-category.dto';
import { UpdateCategoryDto } from '../../application/dto';

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

    it('Should retrieve category with ID 1 as admin', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/category/1')
        .auth(tokens.adminUserToken, { type: 'bearer' });
      expect(body).toHaveProperty('id', 1);
    });

    it('Should not retrieve category with unsaved ID', async () => {
      await request(app.getHttpServer())
        .get('/category/999')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(404);
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
      await request(app.getHttpServer())
        .post('/category/create')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newCategory)
        .expect(401);
    });
    it('Should not create category with duplicate name', async () => {
      const newCategory: createCategoryDto = { name: 'newCategory' };
      await request(app.getHttpServer())
        .post('/category/create')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newCategory)
        .expect(409);
    });
  });
  describe('PUT /category', () => {
    it('Should update a category with ID 4 as admin', async () => {
      const category: UpdateCategoryDto = { name: 'categoryChanged' };
      const { body } = await request(app.getHttpServer())
        .put('/category/4')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(category);
      expect(body).toHaveProperty('name', 'categoryChanged');
    });

    it('Should not update a category as normal user', async () => {
      const category: UpdateCategoryDto = { name: 'categoryChangedTwo' };
      await request(app.getHttpServer())
        .put('/category/4')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(category)
        .expect(401);
    });

    it('Should not update a category with unsaved ID', async () => {
      const category: UpdateCategoryDto = { name: 'categoryChangedThree' };
      await request(app.getHttpServer())
        .put('/category/999')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(category)
        .expect(404);
    });
  });

  describe('DELETE /category', () => {
    it('Should delete a category with ID 4 as admin', async () => {
      await request(app.getHttpServer())
        .delete('/category/4')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
    });

    it('Should not delete a category as normal user', async () => {
      await request(app.getHttpServer())
        .delete('/category/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(401);
    });

    it('Should not delete a category with unsaved ID', async () => {
      await request(app.getHttpServer())
        .delete('/category/999')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
