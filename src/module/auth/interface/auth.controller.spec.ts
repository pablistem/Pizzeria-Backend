import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/service/auth.service';
import { AuthRepository } from '../infrastructure/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/module/user/domain/user.entity';
import { Auth } from '../domain/auth.entity';


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef= await Test.createTestingModule({
        imports:[
          TypeOrmModule.forFeature([User, Auth]),
          UserModule,
          JwtModule.register({
            global: true,
            secret: 'asdfasdfasdf',
            signOptions: { expiresIn: '60s' },
          }),
        ],
        controllers: [AuthController],
        providers: [AuthService,AuthRepository, JwtModule]
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService)
  });

  it('should be defined', async () => {
    const result = {name: 'hola', lastName: 'tambien', email:'unemail@mail.com', password:'password'}
    jest.spyOn(authService, 'signUp').mockImplementation(()=> Promise.resolve())
    expect(await authController.create(result)).toBeDefined();
  });
});
