import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { UserService } from '../../../../../src/module/user/application/service/user.service';
import { AuthService } from '../../../../../src/module/auth/application/service/auth.service';

describe('Products', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    await request(app.getHttpServer()).get('/user/reset');
  });

  it('Should grant access to the auth/me route  with the token in the header', async () => {

    const product = {
      title:"someTitle",
      description:"someDescription",
      category:"someCategory",
      price:200,
      stock:2323,
      image:"someImage"
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluVXNlckBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'Eru85-KoDXpKUGgDpk27PvrTyV_EIS1WcDXnPjOJrNM';
    await request(app.getHttpServer())
      .post('/product/create')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});

