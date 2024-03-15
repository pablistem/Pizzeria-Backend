import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { tokens } from './../../../../../src/common/fixtures/user';
import { AuthService } from 'src/module/auth/application/service/auth.service';
import { ProfileService } from '../../application/service/profile.service';
import { loadFixtures } from 'src/common/fixtures/loader';
import { CreateProfileDto } from '../../application/dto/create-profile.dto';
import { UpdateProfileDto } from '../../application/dto/update-profile.dto';
import { extname } from 'node:path';

describe('Profile', () => {
  let app: INestApplication;
  let authService: AuthService;
  let profileService: ProfileService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = app.get<AuthService>(AuthService);
    profileService = app.get<ProfileService>(ProfileService);
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

    it('Should modify profile being an anon user', async () => {
      const updateProfile: UpdateProfileDto = {
        age: "fa",
      };
      await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .field({...updateProfile})
        .expect(400);
    });

    it('Should not modify a profile with the wrong type of data', async () => {
      const { id, role } = await authService.decodeToken(tokens.anonUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .field({...updateProfile})
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', 'image');
      expect(body).toHaveProperty('name', 'anon');
      expect(body).toHaveProperty('lastName', 'anon');
      expect(body).toHaveProperty('phone', 2610000001);
      expect(body).toHaveProperty('age', parseInt(updateProfile.age));
    });

    it('Should modify profile being an normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .field({...updateProfile})
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', 'image');
      expect(body).toHaveProperty('name', 'normal');
      expect(body).toHaveProperty('lastName', 'normal');
      expect(body).toHaveProperty('phone', 2610000002);
      expect(body).toHaveProperty('age', parseInt(updateProfile.age));
    });

    it('Should modify profile being an admin', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .field({...updateProfile})
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', 'image');
      expect(body).toHaveProperty('name', 'admin');
      expect(body).toHaveProperty('lastName', 'admin');
      expect(body).toHaveProperty('phone', 2610000003);
      expect(body).toHaveProperty('age', parseInt(updateProfile.age));
    });

    it('Should not upload a non-compatible file as avatar', async () => {
      const filePath = `${__dirname}/document.pdf`;
      await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', filePath, {
          contentType: 'doc/pdf'
        })
        .expect(422)
    });

    it('Should upload avatar being a normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const profileFound = await profileService.getProfile(id);
      const filePath = `${__dirname}/image.jpeg`;
      const fileExt = extname(filePath);
      const name =  profileFound.name.toLowerCase();
      const lastName = profileFound.lastName.toLowerCase();
      const fileName = `${name}-${lastName}-avatar-${fileExt}`;
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', filePath, {
          filename: fileName,
          contentType: 'image/jpeg'
        })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', `uploads\\profile\\${fileName}`)
    });

    it('Should upload avatar being an admin user', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const profileFound = await profileService.getProfile(id);
      const filePath = `${__dirname}/image.jpeg`;
      const fileExt = extname(filePath);
      const name =  profileFound.name.toLowerCase();
      const lastName = profileFound.lastName.toLowerCase();
      const fileName = `${name}-${lastName}-avatar-${fileExt}`;
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', filePath, {
          filename: fileName,
          contentType: 'image/jpeg'
        })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', `uploads\\profile\\${fileName}`)
    });
  });

  describe('POST /profile', () => {
    it('Not allow to create a profile', async () => {
      await request(app.getHttpServer())
        .post('/profile')
        .expect(401)
    })

    it('Should not create an already existing profile', async () => {
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(409);
    })

    it('Should not create a new profile by sending the wrong type of data', async () => {
      const newProfile: CreateProfileDto = {
        name: 'Facundo55',
        lastName: 'Castro125',
        phone: "02g0s6dd1",
        age: "123fafa",
      }
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserToken, { type: 'bearer' })
        .send(newProfile)
        .expect(400);
    })

    it('Should create a new profile without an avatar', async () => {
      const { id } = await authService.decodeToken(tokens.newUserToken)
      const newProfile: CreateProfileDto = {
        name: 'Facundo',
        lastName: 'Castro',
        phone: "2610000004",
        age: "32",
      }
      const { body } = await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserToken, { type: 'bearer' })
        .send(newProfile)
        .expect(201);
      expect(body).toHaveProperty('user', id);
      expect(body).toHaveProperty('name', newProfile.name);
      expect(body).toHaveProperty('lastName', newProfile.lastName);
      expect(body).toHaveProperty('phone', parseInt(newProfile.phone));
      expect(body).toHaveProperty('age', parseInt(newProfile.age));
      expect(body).toHaveProperty('avatar', null)
    })

    it('Should not create a profile with a non-compatible file as avatar', async () => {
      const filePath = `${__dirname}/document.pdf`;
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserWithAvatarToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach('avatar', filePath, {
          contentType: 'doc/pdf'
        })
        .expect(422);
    })
    
    it('Should create a new profile with an avatar', async () => {
      const { id } = await authService.decodeToken(tokens.newUserWithAvatarToken)
      const newProfile: CreateProfileDto = {
        name: 'Facundo',
        lastName: 'Castro',
        phone: "2610000005",
        age: "32",
      }
      const filePath = `${__dirname}/image.jpeg`;
      const fileExt = extname(filePath);
      const name =  newProfile.name.toLowerCase();
      const lastName = newProfile.lastName.toLowerCase();
      const fileName = `${name}-${lastName}-avatar-${fileExt}`;
      const { body } = await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserWithAvatarToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .field({...newProfile})
        .attach('avatar', filePath, {
          contentType: 'image/jpeg'
        })
        .expect(201);
      expect(body).toHaveProperty('user', id);
      expect(body).toHaveProperty('name', newProfile.name);
      expect(body).toHaveProperty('lastName', newProfile.lastName);
      expect(body).toHaveProperty('phone', parseInt(newProfile.phone));
      expect(body).toHaveProperty('age', parseInt(newProfile.age));
      expect(body).toHaveProperty('avatar', `uploads\\profile\\${fileName}`)
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
