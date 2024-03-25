import { INestApplication, ValidationPipe } from '@nestjs/common';
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
import { ValidationErrorMessagesEnum } from '../../application/dto/create-profile.dto';

describe('Profile', () => {
  let app: INestApplication;
  let authService: AuthService;
  let profileService: ProfileService;
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = app.get<AuthService>(AuthService);
    profileService = app.get<ProfileService>(ProfileService);
    validationPipe = new ValidationPipe();
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
      expect(body.addresses).toBeInstanceOf(Array);
      expect(body.addresses).toHaveLength(2);
    });

    it('Should get a profile by user ID being a normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const { body } = await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body.addresses).toBeInstanceOf(Array);
      expect(body.addresses).toHaveLength(2);
    });

    it('Should get a profile by user ID being an admin user', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const { body } = await request(app.getHttpServer())
        .get('/profile')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body.addresses).toBeInstanceOf(Array);
      expect(body.addresses).toHaveLength(2);
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

    it('Should not modify a profile with the wrong type of data', async () => {
      const updateProfile: UpdateProfileDto = {
        age: "fa",
      };
      try {
        await validationPipe.transform(updateProfile, { type: 'body', metatype: UpdateProfileDto });
        fail('Validation pipe should throw an exception for invalid data')
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
        expect(error.getResponse().message).toEqual([
          ValidationErrorMessagesEnum.AGE_FIELD_ERROR,
        ])            
      }
    });

    it('Should modify profile being an anon user', async () => {
      const { id, role } = await authService.decodeToken(tokens.anonUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      try {
        const result = await validationPipe.transform(updateProfile, { type: 'body', metatype: UpdateProfileDto });
        const { body } = await request(app.getHttpServer())
          .put('/profile')
          .auth(tokens.anonUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({...result})
          .expect(200)
        expect(body.user).toHaveProperty('id', id);
        expect(body.user).toHaveProperty('role', role);
        expect(body).toHaveProperty('avatar', 'image');
        expect(body).toHaveProperty('username', 'anon');
        expect(body).toHaveProperty('name', 'anon');
        expect(body).toHaveProperty('lastName', 'anon');
        expect(body).toHaveProperty('phone', 2610000001);
        expect(body).toHaveProperty('age', parseInt(updateProfile.age));
      } catch (error) {
        fail('Validation pipe should not throw an exception for valid data');
      }
    });

    it('Should modify profile being an normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      try {
        const result = await validationPipe.transform(updateProfile, { type: 'body', metatype: UpdateProfileDto });
        const { body } = await request(app.getHttpServer())
          .put('/profile')
          .auth(tokens.normalUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({...result})
          .expect(200)
        expect(body.user).toHaveProperty('id', id);
        expect(body.user).toHaveProperty('role', role);
        expect(body).toHaveProperty('avatar', 'image');
        expect(body).toHaveProperty('username', 'normal');
        expect(body).toHaveProperty('name', 'normal');
        expect(body).toHaveProperty('lastName', 'normal');
        expect(body).toHaveProperty('phone', 2610000002);
        expect(body).toHaveProperty('age', parseInt(updateProfile.age));
      } catch (error) {
        fail('Validation pipe should not throw an exception for valid data');
      }
    });

    it('Should modify profile being an admin', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const updateProfile: UpdateProfileDto = {
        age: "40",
      };
      try {
        const result = await validationPipe.transform(updateProfile, { type: 'body', metatype: UpdateProfileDto });
        const { body } = await request(app.getHttpServer())
          .put('/profile')
          .auth(tokens.adminUserToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({...result})
          .expect(200)
        expect(body.user).toHaveProperty('id', id);
        expect(body.user).toHaveProperty('role', role);
        expect(body).toHaveProperty('avatar', 'image');
        expect(body).toHaveProperty('username', 'admin');
        expect(body).toHaveProperty('name', 'admin');
        expect(body).toHaveProperty('lastName', 'admin');
        expect(body).toHaveProperty('phone', 2610000003);
        expect(body).toHaveProperty('age', parseInt(updateProfile.age));
      } catch (error) {
        fail('Validation pipe should not throw an exception for valid data');
      }
    });

    it('Should not upload a non-compatible file as avatar', async () => {
      const fakeFile  = {
        fieldname: 'avatar',
        originalname: 'document.pdf',
        mimetype: 'applicatiom/pdf',
        size: 1204,
        buffer: Buffer.from('avatar'),
      }
      await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname)
        .expect(422)
    });

    it('Should upload avatar being a normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken);
      const profileFound = await profileService.getProfile(id);
      const fakeFile  = {
        fieldname: 'avatar',
        originalname: 'image.jpeg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('avatar'),
      }
      const fileExt = extname(fakeFile.originalname);
      const fileName = `${profileFound.username}-avatar-${fileExt}`;
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, { 
          filename: fileName 
        })
        .expect(200)
      expect(body.user).toHaveProperty('id', id);
      expect(body.user).toHaveProperty('role', role);
      expect(body).toHaveProperty('avatar', `uploads\\profile\\${fileName}`)
    });

    it('Should upload avatar being an admin user', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken);
      const profileFound = await profileService.getProfile(id);
      const fakeFile  = {
        fieldname: 'avatar',
        originalname: 'image.jpeg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('avatar'),
      }
      const fileExt = extname(fakeFile.originalname);
      const fileName = `${profileFound.username}-avatar-${fileExt}`;
      const { body } = await request(app.getHttpServer())
        .put('/profile')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, {
          filename: fileName
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
        username: '[Facu_49]',
        name: 'Facundo49',
        lastName: 'Castro125',
        phone: "02g0s6dd1",
        age: "123fafa",
      }
      try {
        await validationPipe.transform(newProfile, { type: 'body', metatype: CreateProfileDto });
        fail('Validation pipe should throw an exception for invalid data')
      } catch (error) {
        expect(error.getResponse().statusCode).toEqual(400);
        expect(error.getResponse().message).toEqual([
          ValidationErrorMessagesEnum.USERNAME_FIELD_ERROR,
          ValidationErrorMessagesEnum.NAME_FIELD_ERROR,
          ValidationErrorMessagesEnum.LASTNAME_FIELD_ERROR,
          ValidationErrorMessagesEnum.AGE_FIELD_ERROR,
          ValidationErrorMessagesEnum.PHONE_FIELD_ERROR
        ])       
      }
    })

    it('Should create a new profile without an avatar', async () => {
      const { id } = await authService.decodeToken(tokens.newUserToken)
      const newProfile: CreateProfileDto = {
        username: 'Facu_497',
        name: 'Facundo',
        lastName: 'Castro',
        phone: "2610000004",
        age: "32",
      }
      try {
        const result = await validationPipe.transform(newProfile, { type: 'body', metatype: CreateProfileDto });
        const { body } = await request(app.getHttpServer())
          .post('/profile')
          .auth(tokens.newUserToken, { type: 'bearer' })
          .send(result)
          .expect(201);
        expect(body).toHaveProperty('user', id);
        expect(body).toHaveProperty('username', newProfile.username);
        expect(body).toHaveProperty('name', newProfile.name);
        expect(body).toHaveProperty('lastName', newProfile.lastName);
        expect(body).toHaveProperty('phone', parseInt(newProfile.phone));
        expect(body).toHaveProperty('age', parseInt(newProfile.age));
        expect(body).toHaveProperty('avatar', null)
      } catch (error) {
        fail('Validation pipe should not throw an exception for valid data')
      }
      
    })

    it('Should not create a profile with a non-compatible file as avatar', async () => {
      const fakeFile  = {
        fieldname: 'avatar',
        originalname: 'document.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('avatar'),
      }
      await request(app.getHttpServer())
        .post('/profile')
        .auth(tokens.newUserWithAvatarToken, { type: 'bearer' })
        .set('Content-Type', 'multipart/form-data')
        .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname)
        .expect(422);
    })
    
    it('Should create a new profile with an avatar', async () => {
      const { id } = await authService.decodeToken(tokens.newUserWithAvatarToken)
      const newProfile: CreateProfileDto = {
        username: 'facu_497',
        name: 'Facundo',
        lastName: 'Castro',
        phone: "2610000005",
        age: "32",
      }
      const fakeFile = {
        fieldname: 'avatar',
        originalname: 'image.jpeg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('avatar'),
      }
      const fileExt = extname(fakeFile.originalname);
      const fileName = `${newProfile.username}-avatar-${fileExt}`;
      try {
        const result = await validationPipe.transform(newProfile, { type: 'body', metatype: CreateProfileDto });
        const { body } = await request(app.getHttpServer())
          .post('/profile')
          .auth(tokens.newUserWithAvatarToken, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .field({...result})
          .attach(fakeFile.fieldname, fakeFile.buffer, fakeFile.originalname)
          .expect(201);
        expect(body).toHaveProperty('user', id);
        expect(body).toHaveProperty('username', newProfile.username);
        expect(body).toHaveProperty('name', newProfile.name);
        expect(body).toHaveProperty('lastName', newProfile.lastName);
        expect(body).toHaveProperty('phone', parseInt(newProfile.phone));
        expect(body).toHaveProperty('age', parseInt(newProfile.age));
        expect(body).toHaveProperty('avatar', `uploads\\profile\\${fileName}`)
      } catch (error) {
        fail('Validation pipe should not throw an exception for valid data');
      }
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
