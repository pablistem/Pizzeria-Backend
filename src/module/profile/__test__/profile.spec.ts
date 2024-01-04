import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { loadFixtures } from 'src/common/fixtures/loader';
import { tokens } from 'src/common/fixtures/user';
import { UpdateProfileDto } from '../dto/profile.dto';

describe('Profile', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /profile/:id', () => {
    it('Not allowed to see the profile ', async () => {
      await request(app.getHttpServer()).get('/profile/3').expect(401);
    });
    it('Profile not found', async () => {
      await request(app.getHttpServer())
        .get('/profile/3')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });
    it('Get normal user profile', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/profile/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
      expect(body).toHaveProperty('id', 1);
    });
  });

  describe('POST /profile', () => {
    it('Not allowed to create a profile', async () => {
      const newUser = {
        phone: 261000003,
        adress: 'Av. Maza 140',
        user: 'anom',
      };
      await request(app.getHttpServer())
        .post('/profile')
        .send(newUser)
        .expect(401);
    });
    it('Profile created successfully', async () => {
      const newUser = {
        phone: 261000003,
        adress: 'Av. Maza 140',
        user: 'anom',
      };
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newUser)
        .expect(201);
    });
  });

  describe('PUT /profile/:id', () => {
    it('Not allowed to update the profile', async () => {
      const changes: UpdateProfileDto = {
        id: 1,
        phone: 261000006,
      };
      await request(app.getHttpServer())
        .put('/profile/1')
        .send(changes)
        .expect(401);
    });
    it('Profile not found', async () => {
      const changes: UpdateProfileDto = {
        id: 1,
        phone: 261000006,
      };
      await request(app.getHttpServer())
        .put('/profile/3')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(changes)
        .expect(404);
    });
    it('Profile updated successfully', async () => {
      const changes: UpdateProfileDto = {
        id: 1,
        phone: 261000006,
      };
      await request(app.getHttpServer())
        .put('/profile/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(changes)
        .expect(200);
    });
  });

  describe('DELETE /profile/:id', () => {
    it('Not allowed to delete the profile', async () => {
      await request(app.getHttpServer()).delete('/profile/3').expect(401);
    });
    it('Profile not found', async () => {
      await request(app.getHttpServer())
        .delete('/profile/3')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });
    it('Profile removed sucessfully', async () => {
      await request(app.getHttpServer())
        .delete('/profile/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
