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
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('order')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: IOrderRepository,
    @Inject(OrderMapper) private readonly orderMapper: OrderMapper,
  ) {}

  @Get(':id')
  async findAll(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne(orderId);
    return order;
  }

  @UseGuards(JwtGuard)
  @Get('me/:id')
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

  @Post('me')
  async createByUser(@Body() dto: CreateOrderDto, @Body() req) {
    const order = this.orderMapper.fromDtoToEntity(dto);
    const newOrder = await this.orderService.generatedOrderFromUser(order, req.token);
    return newOrder
  }
}
