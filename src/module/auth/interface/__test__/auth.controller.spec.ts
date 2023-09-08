import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Header, HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '../../../../app.module';
import { CreateUserDto } from '../../../user/application/dto/create-user.dto';
import { UserService } from '../../../../../src/module/user/application/service/user.service';
import { AuthService } from '../../application/service/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
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

  it('should be register an user (201)', async () => {
    const userRegister: CreateUserDto = {
      name: 'TEST_NAME',
      lastName: 'TEST_LASTNAME',
      email: 'TEST@email.com',
      password: 'TEST_PASSWORD',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userRegister)
      .expect(HttpStatus.CREATED);
  });

  it('should be throw error "conflict: user already exist" (409)', async () => {
    const userRegister = {
      name: 'TEST_NAME',
      lastName: 'TEST_LASTNAME',
      email: 'TEST@email.com',
      password: 'TEST_PASSWORD',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userRegister)
      .expect(HttpStatus.CONFLICT);
  });

  it('Should return a user-type token after logging in.', async () => {
    const userLogin: CreateUserDto = {
      email: 'testUser@email.com',
      password: 'user_password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin);
    const authResponse: { user: number; token: string } = response.body;
    const token = await authService.decodedToken(authResponse.token);
    expect(token).toMatchObject({ role: 'user' });
  });

  it('Should return a admin-type token after logging in.', async () => {
    const userLogin: CreateUserDto = {
      email: 'adminUser@email.com',
      password: 'admin_password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin);
    const authResponse: { user: number; token: string } = response.body;
    let token = await authService.decodedToken(authResponse.token);
    expect(token).toMatchObject({ role: 'admin' });
  });

  it('should be unauthorized try login with false email (401)', async () => {
    const userLogin: CreateUserDto = {
      email: 'TEST_false@email.com',
      password: 'TEST_PASSWORD',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should be unauthorized try login with false password (401)', async () => {
    const userLogin: CreateUserDto = {
      email: 'TEST@email.com',
      password: 'TEST_PASSWORD_FALSE',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('Should grant access to the auth/me route  with the token in the header', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6IjEiLCJlbWFpbCI6ImFkbWluVXNlckBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.' +
      'Eru85-KoDXpKUGgDpk27PvrTyV_EIS1WcDXnPjOJrNM';
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect('ok');
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
