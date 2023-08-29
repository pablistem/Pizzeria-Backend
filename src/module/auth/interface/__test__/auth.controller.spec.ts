import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateUserDto } from '../../../user/application/dto/create-user.dto';
import { UserService } from '../../../../../src/module/user/application/service/user.service';
import { Auth } from '../../domain/auth.entity';

describe('AuthController', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    userService = app.get<UserService>(UserService);

    await app.init();
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

  it('should be throw error "user alredy exist" (409)', async () => {
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

  it('should be id and token try login', async () => {
    const userLogin: CreateUserDto = {
      email: 'TEST@email.com',
      password: 'TEST_PASSWORD',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userLogin);
    const authResponse: Auth = response.body;
    expect(authResponse).toBeDefined();
    expect(authResponse.refreshToken);
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

  afterAll(async () => {
    await app.close();
  });
});

// jest
//   .spyOn(userService, 'getUserByEmail')
//   .mockImplementation((email: string) => {
//     throw new NotFoundException();
//   });
