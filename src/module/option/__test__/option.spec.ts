import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../src/app.module';
import { tokens } from '../../../../src/common/fixtures/user';
import { loadFixtures } from '../../../../src/common/fixtures/loader';
import { UpdateOptionDto } from '../dto/option.dto';

describe('Option', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /option', () => {
    it('Should get all the options', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/option')
        .expect(200);
      expect(body).toHaveLength(2);
    });
  });

  describe('GET /option/:id', () => {
    it('Should get a option by ID', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/option/1')
        .expect(200);
      expect(body).toHaveProperty('id', 1);
    });
    it('Should get a not found response', async () => {
      await request(app.getHttpServer()).get('/option/5').expect(404);
    });
  });

  describe('POST /option', () => {
    it('not allowed to create an option', async () => {
      const newOption = {
        variant: 'option_3',
        price: 100,
        product: 1,
      };

      await request(app.getHttpServer())
        .post('/option')
        .send(newOption)
        .expect(401);
    });

    it('Should create an option', async () => {
      const newOption = {
        variant: 'option_3',
        price: 100,
        product: 1,
      };

      await request(app.getHttpServer())
        .post('/option')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(newOption)
        .expect(201);
    });
  });

  describe('PATCH /option/:id', () => {
    it('Should update the price of one option', async () => {
      const updateOption: UpdateOptionDto = {
        id: 2,
        price: 200,
      };
      await request(app.getHttpServer())
        .put('/option/2')
        .send(updateOption)
        .expect(401);
    });

    it('Should update the price of one option', async () => {
      const updateOption: UpdateOptionDto = {
        id: 2,
        price: 200,
      };
      const { body } = await request(app.getHttpServer())
        .put('/option/2')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .send(updateOption)
        .expect(200);
      expect(body).toHaveProperty('price', 200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
