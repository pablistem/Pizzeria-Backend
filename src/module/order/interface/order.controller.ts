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
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../application/service/order.service';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../application/repository/order.repository.interface';
import { Order } from '../domain/order.entity';
import { CreateOrderDto } from '../application/dto/create-order.dto';
import { OrderMapper } from '../application/order.mapper';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';
import { UpdateOrderDto } from '../application/dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(OrderMapper) private readonly orderMapper: OrderMapper,
  ) {}

  @Get()
  async findAll(@Req() req: UserRequest): Promise<Order[]> {
    const orders = await this.orderService.findAll(req.user.id);
    return orders;
  }

  @Get(':id')
  async findOne(
    @Req() req: UserRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const order = await this.orderService.findById(req.user.id, id);
    return order;
  }

  @Post()
  async create(
    @Req() req: UserRequest,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const newOrder = this.orderMapper.fromDtoToEntity(createOrderDto);
    const order = await this.orderService.create(req.user.id, newOrder);
    return order;
  }

  @Put(':id')
  async update(
    @Req() req: UserRequest,
    @Param('id', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    updateOrderDto.id = orderId;
    const order = await this.orderService.update(
      req.user.id,
      orderId,
      this.orderMapper.fromDtoToEntity(updateOrderDto),
    );
    return order;
  }

  @Delete(':id')
  async delete(
    @Req() req: UserRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.orderService.delete(req.user.id, id);
  }
}
