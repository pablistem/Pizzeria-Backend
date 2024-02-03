import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './domain/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './application/service/address.service';
import { AddressRepository } from './infrastructure/address.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    controllers: [AddressController],
    providers: [AddressService, AddressRepository],
})
export class AddressModule {}