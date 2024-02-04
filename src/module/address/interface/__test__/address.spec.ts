import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { TestService } from "src/module/test/application/service/test.service";
import { CreateAddressDto, UpdateAddressDto } from "../../application/dto/address.dto";
import { AddAddressDto } from "../../application/dto/add-remove-address.dto";

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
    it('the address should not exist', async () => {
      await request(app.getHttpServer()).get('/address/999').expect(404);
    })

    it('should show the addresses from one profile', async () => {
      const { body } = await request(app.getHttpServer()).get('/address/1').expect(200);

      expect(body).toHaveProperty('id', 1);
      expect(body.addresses).toEqual(
        expect.arrayContaining(['Av. Callao 123', 'San Martín 555', 'Buenos Aires 111'])
      )
    })
  })

  describe('POST /address', () => {
    it('should create the address', async () => {
      const newAddresses: CreateAddressDto = {
        country: 'Argentina',
        state: 'Mendoza',
        city: 'Mendoza',
        addresses: ['Av. Callao 789', 'San Martín 999', 'Buenos Aires 333']
      };
      await request(app.getHttpServer())
        .post('/address')
        .send(newAddresses)
        .expect(201);
    })
  })

  describe('PUT /address', () => {
    it('should update the addresses data', async () => {
      const newAddress: UpdateAddressDto = {
        country: 'Argentina',
        state: 'Córdoba',
        city: 'Córdoba',
        addresses: ['Avellaneda 888', 'Lencinas 856', 'Perú 999'],
      }
      const { body } = await request(app.getHttpServer())
        .put('/address/1')
        .send(newAddress)
        .expect(200);
      expect(body).toHaveProperty('state', 'Córdoba');
    })
  })

  describe('PUT /address', () => {
    it('should add a new address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/add/1')
        .send(newAddress)
        .expect(200);
      expect(body.addresses).toContain('Lencinas 856')
    })
  })

  describe('PUT /address', () => {
    it('should add a new address', async () => {
      const newAddress: AddAddressDto = { 
        address: 'Lencinas 856',
      };
      const { body } = await request(app.getHttpServer())
        .put('/address/remove/1')
        .send(newAddress)
        .expect(200);
      expect(body.addresses).not.toContain('Lencinas 856')
    })
  })

  afterAll(async () => {
    await app.close();
  })
})