import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "../../../../app.module";
import { CreateAddressDto, UpdateAddressDto } from "../../application/dto/address.dto";
import { tokens } from "../../../../common/fixtures/user";
import { loadFixtures } from "../../../../common/fixtures/loader";
import { AuthService } from "src/module/auth/application/service/auth.service";

describe('Address', () => {
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

  describe('GET /addresses', () => {
    it('Should not be allowed to access the address information', async () => {
      await request(app.getHttpServer()).get('/address/1').expect(401);
    });

    it('The address should not exist in the database', async () => {
      await request(app.getHttpServer())
        .get('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(404);
    });

    it('Should show the address of the anon user', async () => {
      const { id, role } = await authService.decodeToken(tokens.anonUserToken)
      const { body } = await request(app.getHttpServer())
        .get('/address/3')
        .auth(tokens.anonUserToken, { type: 'bearer' })
        .expect(200);
      expect(body.profile.user).toHaveProperty('id', id);
      expect(body.profile.user).toHaveProperty('role', role);
    });

    it('Should show the address of the normal user', async () => {
      const { id, role } = await authService.decodeToken(tokens.normalUserToken)
      const { body } = await request(app.getHttpServer())
        .get('/address/5')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .expect(200);
      expect(body.profile.user).toHaveProperty('id', id);
      expect(body.profile.user).toHaveProperty('role', role);
    });

    it('Should show the address of the admin user', async () => {
      const { id, role } = await authService.decodeToken(tokens.adminUserToken)
      const { body } = await request(app.getHttpServer())
        .get('/address/1')
        .auth(tokens.adminUserToken, { type: 'bearer' })
        .expect(200);
      console.log(body)
      expect(body.profile.user).toHaveProperty('id', id);
      expect(body.profile.user).toHaveProperty('role', role);
    });
  });

  describe('POST /address', () => {
    it('Should not be allowed to create the address', async () => {
      await request(app.getHttpServer())
        .post('/address')
        .expect(401);
    });

    it('Should create the address', async () => {
      const newAddress: CreateAddressDto = {
        country: 'Argentina',
        state: 'Mendoza',
        city: 'Mendoza',
        street: 'Av. Callao',
        height: 789,
        postalCode: 1000,
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
        .auth(tokens.normalUserToken, { type: 'bearer'})
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