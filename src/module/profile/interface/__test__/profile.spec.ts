import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module';
import * as request from 'supertest'
import { UpdateProfileDto } from '../../application/dto/update-profile.dto';
import { TestService } from 'src/module/test/application/service/test.service';
import { tokens } from './../../../../../src/common/fixtures/user';

describe('Profile', () => {
    let app: INestApplication;
    let testService: TestService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        app = moduleRef.createNestApplication();
        await app.init();
        testService = app.get<TestService>(TestService); 
        const fixtures = await testService.getEntities()
        const fixtureWithEntities = testService.entitiesWithFixtures(fixtures)
        await testService.load(fixtureWithEntities)
    });
    
    describe('GET /profile', () => {
        it('Should get all profiles', async () => {
            const response = await request(app.getHttpServer())
            .get('/profile')
            expect(response.statusCode).toBe(200);
            
            /* const body: Profile[] = response.body;
            expect(body).toHaveLength(1); */
        });
    });

    describe('POST /profile', () => {
        it('Should create new profile', async () => {
            const newProfile: any = {
                avatar: 'imagen',
                street: 'calle x',
                height: 1234,
                postalCode: 5000,
                age: 30,
                user: 3 
            }
            const response = await request(app.getHttpServer())
            .post('/profile')
            .send(newProfile)
            expect(response.statusCode).toBe(201);
        });
    });

    describe('GET /profile/:id', () => {
        it('Should get a profile by ID', async() => {
            const response = await request(app.getHttpServer())
            .get('/profile/1')
            expect(response.body).toHaveProperty('id', 1);
        });
        
        it('Should get not found profile by ID', async () => {
            const response = await request(app.getHttpServer())
            .get('/profile/999')
            expect(response.statusCode).toBe(404);
        });
    });
    
    describe('PUT /profile/:id', () => {
        it('Should modify profile being admin', async () => {
            const updateProfileDto: UpdateProfileDto = {
                age: 30
            };
            const response = await request(app.getHttpServer())
            .put('/profile/1')
            .send(updateProfileDto)
            .auth(tokens.adminUserToken, { type: 'bearer' })
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('age', 30);
        });

        it("Shouldn't modify profile being normal user", async () => {
            const updateProfileDto: UpdateProfileDto = {
                age: 30
            };
            const response = await request(app.getHttpServer())
            .put('/profile/1')
            .send(updateProfileDto);
            expect(response.statusCode).toBe(401);
        });
    });

    
    afterAll(async () => {
        await app.close()
    });
});