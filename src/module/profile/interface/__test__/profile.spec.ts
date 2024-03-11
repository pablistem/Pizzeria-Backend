import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { UpdateProfileDto } from '../../application/dto/update-profile.dto';
import { tokens } from './../../../../../src/common/fixtures/user';
import { AuthService } from 'src/module/auth/application/service/auth.service';
import { loadFixtures } from 'src/common/fixtures/loader';
import { CreateProfileDto } from '../../application/dto/create-profile.dto';

describe('Profile', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = app.get<AuthService>(AuthService);
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /profile', () => {
    it('Not allow to access to the profile', async () => {
      await request(app.getHttpServer())
        .get('/profile')
        .expect(401)
    });

    it('Should get not found profile by ID', async () => {
      await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.newUserToken, { type: 'bearer' })
        .expect(404);
    });

    it('Should get a profile by user ID being an anon user', async () => {
      const { id, role } = await authService.decodeToken(tokens.anonUserToken);
      const { body } = await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
    });

    it('Should get a profile by user ID being a normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const { body } = await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
    });

    it('Should get a profile by user ID being an admin user', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const { body } = await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
    });
  });

  describe('PUT /profile', () => {
    it('Not allow to modify the profile', async () => {
      await request(app.getHttpServer())
        .put('/profile')
        .expect(401)
    })

    it('Profile to be modified not found', async () => {
      await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.newUserToken, { type: 'bearer' })
        .expect(404)
    })

    it('Should modify profile being anon user', async () => {
      const { id, role } = await authService.decodeToken(tokens.anonUserToken);
      const updateProfileDto: UpdateProfileDto = {
        age: 40,
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .send(updateProfileDto)
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('age', 40);
    });

    it('Should modify profile being normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const updateProfileDto: UpdateProfileDto = {
        age: 40,
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .send(updateProfileDto)
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('age', 40);
    });

    it('Should modify profile being admin', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const updateProfileDto: UpdateProfileDto = {
        age: 40,
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .send(updateProfileDto)
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('age', 40);
    });
  });

  describe('POST /profile', () => {
    it('Not allow to create a profile', async () => {
      await request(app.getHttpServer())
        .post('/profile')
        .expect(401)
    })

    it('Should not create the profile because it already exists', async () => {
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(409);
    })

    it('Should create a new profile', async () => {
      const { id } = await authService.decodeToken(tokens.newUserToken)
      const newProfile: CreateProfileDto = {
        name: 'Facundo',
        lastName: 'Castro',
        phone: 2610000004,
        age: 32,
      }
      const { body } = await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserToken, { type: 'bearer' })
        .send(newProfile)
        .expect(201);
      expect(body).toHaveProperty('user', id);
      expect(body).toHaveProperty('name', newProfile.name);
      expect(body).toHaveProperty('lastName', newProfile.lastName);
      expect(body).toHaveProperty('phone', newProfile.phone);
      expect(body).toHaveProperty('age', newProfile.age);
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
