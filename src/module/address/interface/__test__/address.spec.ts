import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing"; 
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { TestService } from "src/module/test/application/service/test.service";
import { UpdateAddressDto } from "../../application/dto/address.dto";

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
    it('should create a new array of addresses', async () => {
      const newAddresses = ['Av. Callao 789', 'San Martín 999', 'Buenos Aires 333'];
      await request(app.getHttpServer())
        .post('/address')
        .send(newAddresses)
        .expect(201);
    })
  })

  describe('PUT /address', () => {
    it('should update an array of addresses', async () => {
      const newAddress: UpdateAddressDto = {
        address: 'Lencinas 856'
      }
      await request(app.getHttpAdapter())
        .put('/address/add/1')
        .send(newAddress)
        .expect(201);
    })
  })

  describe('PUT /address', () => {
    it('should update an array of addresses', async () => {
      const newAddress: UpdateAddressDto = { 
        address: 'Lencinas 856'
      };
      await request(app.getHttpAdapter())
        .put('/address/remove/1')
        .send(newAddress)
        .expect(201);
    })
  })

  afterAll(async () => {
    await app.close();
  })
})