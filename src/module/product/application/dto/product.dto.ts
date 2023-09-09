import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ProductDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id:number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price:number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stock:number
    options:string
}