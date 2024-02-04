import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { TestService } from "src/module/test/application/service/test.service";
import { CreateAddressDto, UpdateAddressDto } from "../../application/dto/address.dto";
import { AddAddressDto } from "../../application/dto/add-remove-address.dto";
import { tokens } from "src/common/fixtures/user";

describe('Address', () => {
  let app: INestApplication;
  let testService: TestService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication()
    testService = moduleRef.get<TestService>(TestService);
    const entities = await testService.getEntities();
    const entitiesWithFixtures = await testService.entitiesWithFixtures(entities);
    await testService.load(entitiesWithFixtures);
    await app.init();
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
      expect(body.addresses).toEqual(
        expect.arrayContaining(['Av. Callao 123', 'San Martín 555', 'Buenos Aires 111'])
      )
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
        addresses: ['Av. Callao 789', 'San Martín 999', 'Buenos Aires 333']
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
        addresses: ['Av. Callao 789', 'San Martín 999', 'Buenos Aires 333']
      };
      const { body } = await request(app.getHttpServer())
        .post('/address')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddresses)
        .expect(201);
      expect(body).toHaveProperty('id', 3);
    })
  })

  describe('PUT /address', () => {
    it('should not be allowed to update the addresses data', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        addresses: ['Avellaneda 888', 'Lencinas 856', 'Perú 999'],
      }
      const { body } = await request(app.getHttpServer())
        .put('/address/1')
        .send(newAddress)
        .expect(401);
    })

    it('should update the addresses data', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        addresses: ['Avellaneda 888', 'Lencinas 856', 'Perú 999'],
      }
      const { body } = await request(app.getHttpServer())
        .put('/address/1')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .send(newAddress)
        .expect(200);
      expect(body).toHaveProperty('state', 'Córdoba');
    })

    it('should update the addresses data', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        addresses: ['Avellaneda 888', 'Lencinas 856', 'Perú 999'],
      }
      await request(app.getHttpServer())
        .put('/address/999')
        .auth(tokens.normalUserToken, { type: 'bearer'})
        .send(newAddress)
        .expect(404);
    })
  })

  describe('PUT /add and remove addresses', () => {
    it('should not be allowed to add a new address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      await request(app.getHttpServer())
        .put('/address/add/1')
        .send(newAddress)
        .expect(401);
    })

    it('should not put a new address to an unexisting array', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/add/999')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddress)
        .expect(404);
    })

    it('should add a new address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/add/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddress)
        .expect(200);
      expect(body.addresses).toContain('Lencinas 856')
    })

    it('should not be allowed to remove an existing address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      await request(app.getHttpServer())
        .put('/address/remove/1')
        .send(newAddress)
        .expect(401);
    })

    it('should not remove an address from an unexisting array', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/remove/999')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddress)
        .expect(404);
    })

    it('should remove an existing address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/remove/1')
        .auth(tokens.normalUserToken, { type: 'bearer' })
        .send(newAddress)
        .expect(200);
      expect(body.addresses).not.toContain('Lencinas 856')
    })
  })

  afterAll(async () => {
    await app.close();
  })
})