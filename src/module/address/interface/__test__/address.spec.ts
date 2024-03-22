import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "../../../../app.module";
import { CreateAddressDto, UpdateAddressDto } from "../../application/dto/address.dto";
import { tokens } from "../../../../common/fixtures/user";
import { loadFixtures } from "../../../../common/fixtures/loader";
import { AuthService } from "src/module/auth/application/service/auth.service";
import { ProfileService } from "src/module/profile/application/service/profile.service";

describe('Address', () => {
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

  describe('GET /address', () => {
    it('Should not be allowed to access the address information', async () => {
      await request(app.getHttpServer()).get('/address/1').expect(401);
    });

    it('The address should not exist in the database', async () => {
      await request(app.getHttpServer())
        .get('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });

    it('Should show an address of the anon user', async () => {
      const { id } = await authService.decodeToken(tokens.anonUserToken);
      const { addresses } = await profileService.getProfile(id)
      const { body } = await request(app.getHttpServer())
        .get('/address/3')
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .expect(200);
      const addressFound = addresses.find(address => address.id === body.id)
      expect(body).toHaveProperty('id', addressFound.id);
      expect(body).toHaveProperty('country', addressFound.country);
      expect(body).toHaveProperty('state', addressFound.state);
      expect(body).toHaveProperty('city', addressFound.city);
      expect(body).toHaveProperty('height', addressFound.height);
      expect(body).toHaveProperty('postalCode', addressFound.postalCode);
    });

    it('Should show an address of the normal user', async () => {
      const { id } = await authService.decodeToken(tokens.normalUserToken)
      const { addresses } = await profileService.getProfile(id)
      const { body } = await request(app.getHttpServer())
        .get('/address/5')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
      const addressFound = addresses.find(address => address.id === body.id)
      expect(body).toHaveProperty('id', addressFound.id);
      expect(body).toHaveProperty('country', addressFound.country);
      expect(body).toHaveProperty('state', addressFound.state);
      expect(body).toHaveProperty('city', addressFound.city);
      expect(body).toHaveProperty('height', addressFound.height);
      expect(body).toHaveProperty('postalCode', addressFound.postalCode);
    });

    it('Should show an address of the admin user', async () => {
      const { id } = await authService.decodeToken(tokens.adminUserToken);
      const { addresses } = await profileService.getProfile(id)
      const { body } = await request(app.getHttpServer())
        .get('/address/1')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
        const addressFound = addresses.find(address => address.id === body.id)
      expect(body).toHaveProperty('id', addressFound.id);
      expect(body).toHaveProperty('country', addressFound.country);
      expect(body).toHaveProperty('state', addressFound.state);
      expect(body).toHaveProperty('city', addressFound.city);
      expect(body).toHaveProperty('height', addressFound.height);
      expect(body).toHaveProperty('postalCode', addressFound.postalCode);
    });
  });

  describe('POST /address', () => {
    it('Should not be allowed to create the address', async () => {
      await request(app.getHttpServer())
        .post('/address')
        .expect(401);
    });

    it('Should create an address', async () => {
      const newAddress: CreateAddressDto = {
        country: 'Argentina',
        state: 'Mendoza',
        city: 'Mendoza',
        street: 'Av. Callao',
        height: 789,
        postalCode: 1000,
        profile: 2,
      };
      const { body } = await request(app.getHttpServer())
        .post('/address')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddress)
        .expect(201);
      expect(body).toHaveProperty('id', 7);
      expect(body).toHaveProperty('country', newAddress.country);
      expect(body).toHaveProperty('state', newAddress.state);
      expect(body).toHaveProperty('city', newAddress.city);
      expect(body).toHaveProperty('street', newAddress.street);
      expect(body).toHaveProperty('height', newAddress.height);
      expect(body).toHaveProperty('postalCode', newAddress.postalCode);
    });
  });

  describe('PUT /address', () => {
    it('Should not be allowed to update the address', async () => {
      await request(app.getHttpServer())
        .put('/address/3')
        .expect(401);
    });

    it('Cannot retrieve the address to update', async () => {
      await request(app.getHttpServer())
        .put('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });

    it('Should update the address', async () => {
      const updateAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        street: 'Av. Avellaneda',
        height: 789,
        postalCode: 1000,
      }
      const { body } = await request(app.getHttpServer())
        .put('/address/3')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .send(updateAddress)
        .expect(200);
      expect(body).toHaveProperty('country', updateAddress.country);
      expect(body).toHaveProperty('state', updateAddress.state);
      expect(body).toHaveProperty('city', updateAddress.city);
      expect(body).toHaveProperty('street', updateAddress.street);
      expect(body).toHaveProperty('height', updateAddress.height);
      expect(body).toHaveProperty('postalCode', updateAddress.postalCode);
    })
  })

  describe('DELETE /address', () => {
    it('Should not be allowed to erase the address', async () => {
      await request(app.getHttpServer())
        .delete('/address/7')
        .expect(401);
    })

    it('Should erase the address', async () => {
      await request(app.getHttpServer())
        .delete('/address/7')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .expect(200);
    })

    it('Cannot retrieve the address to erase', async () => {
      await request(app.getHttpServer())
        .delete('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .expect(404);
    })
  })

  afterAll(async () => {
    await app.close();
  })
})