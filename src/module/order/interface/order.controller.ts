import {
  Controller,
  Inject,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from '../application/service/order.service';
import { IOrderRepository, ORDER_REPOSITORY } from '../application/repository/order.repository.interface';
import { Order } from '../domain/order.entity';
import { CreateOrderDto } from '../application/dto/create-order.dto';
import { OrderMapper } from '../application/order.mapper';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthService } from 'src/module/auth/application/service/auth.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: IOrderRepository,
    @Inject(OrderMapper) private readonly orderMapper: OrderMapper,
  ) {}

  @UseGuards(AdminGuard)
  @Get('/')
  async findAll(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    console.log(orderId)
    const order = await this.orderRepository.findOne(orderId);
    return order;
  }


  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    console.log(orderId)
    const order = await this.orderRepository.findOne(orderId);
    return order;
  }

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<Order> {

    const order = this.orderMapper.fromDtoToEntity(dto);
    const newOrder = await this.orderService.create(order);
    return newOrder;
  }

  @Post('by')
  async createByUser(@Body() dto: CreateOrderDto, @Body() req) {

    const order = this.orderMapper.fromDtoToEntity(dto);
    const newOrder = await this.orderService.generatedOrderFromUser(order, req.token);
    return newOrder
  }
}
