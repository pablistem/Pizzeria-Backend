import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { CreateAddressDto, UpdateAddressDto } from "../../application/dto/address.dto";
import { tokens } from "src/common/fixtures/user";
import { loadFixtures } from "src/common/fixtures/loader";

describe('Address', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await loadFixtures(app);
  });

  describe('GET /address', () => {
    it('should not be allowed to access the address information', async () => {
      await request(app.getHttpServer()).get('/address/1').expect(401);
    })

    it('should show the addresses from one profile', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/address/1')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .expect(200);

      expect(body).toHaveProperty('id', 1);
    })

    it('the address should not exist in the database', async () => {
      await request(app.getHttpServer())
        .get('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .expect(404);
    })
  })

  describe('POST /address', () => {
    it('should not be allowed to create the address', async () => {
      const newAddresses: CreateAddressDto = {
        country: 'Argentina',
        state: 'Mendoza',
        city: 'Mendoza',
        address: 'Av. Callao 789',
      };
      await request(app.getHttpServer())
        .post('/address')
        .send(newAddresses)
        .expect(401);
    })

    it('should create the address', async () => {
      const newAddresses: CreateAddressDto = {
        country: 'Argentina',
        state: 'Mendoza',
        city: 'Mendoza',
        address: 'Av. Callao 789',
      };
      const { body } = await request(app.getHttpServer())
        .post('/address')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddresses)
        .expect(201);
      expect(body).toHaveProperty('id', 7);
    })
  })

  describe('PUT /address', () => {
    it('should not be allowed to update the address', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        address: 'Avellaneda 888',
      }
      await request(app.getHttpServer())
        .put('/address/3')
        .send(newAddress)
        .expect(401);
    })

    it('should update the address', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        address: 'Avellaneda 888',
      }
      const { body } = await request(app.getHttpServer())
        .put('/address/3')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .send(newAddress)
        .expect(200);
      expect(body).toHaveProperty('state', 'Córdoba');
      expect(body).toHaveProperty('city', 'Córdoba');
      expect(body).toHaveProperty('address', 'Avellaneda 888');
    })

    it('cannot retrieve the address to update', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        address: 'Avellaneda 888',
      }
      await request(app.getHttpServer())
        .put('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .send(newAddress)
        .expect(404);
    })
  })

  describe('DELETE /address', () => {
    it('should not be allowed to erase the address', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/address/7')
        .expect(401);
    })

    it('should erase the address', async () => {
      await request(app.getHttpServer())
        .delete('/address/7')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .expect(200);
    })

    it('cannot retrieve the address to erase', async () => {
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