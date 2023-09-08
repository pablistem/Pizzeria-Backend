import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { UserService } from '../../../../../src/module/user/application/service/user.service';
import { AuthService } from '../../../../../src/module/auth/application/service/auth.service';

describe('Products', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    userService = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
    await app.init();

    await request(app.getHttpServer()).get('/user/reset');
  });

  it('Should grant access to create product as admin', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluVXNlckBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'Eru85-KoDXpKUGgDpk27PvrTyV_EIS1WcDXnPjOJrNM';
    await request(app.getHttpServer())
      .post('product/create')
      .set('Authorization', `Bearer ${token}`)
      .expect('si');
  });

  afterAll(async () => {
    await app.close();
  });
});

// jest
//   .spyOn(userService, 'getUserByEmail')
//   .mockImplementation((email: string) => {
//     throw new NotFoundException();
//   });
