import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './domain/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './application/service/address.service';
import { AddressRepository } from './infrastructure/address.repository';
import { ADDRESS_REPOSITORY } from './application/repository/address.repository.interface';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    controllers: [AddressController],
    providers: [
      AddressService,
      {
        provide: ADDRESS_REPOSITORY,
        useClass: AddressRepository
      }
    ],
})
export class AddressModule {}