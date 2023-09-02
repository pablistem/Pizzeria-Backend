import { Injectable, Inject } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../repository/order.repository.interface';
import { Order } from '../../domain/order.entity';
import { UserService } from 'src/module/user/application/service/user.service';
import { AuthService } from 'src/module/auth/application/service/auth.service';
import { TokenDto } from '../dto/token.dto';
@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: IOrderRepository,
    @Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authservice:AuthService
  ) {}

  async create(order: Order): Promise<Order> {
    return await this.orderRepository.create(order);
  }

  async generatedOrderFromUser(order: Order, token:string) {
    let tokenDto:TokenDto
    const decodedToken = await this.authservice.decodedToken(token)
    Object.assign(tokenDto,decodedToken)
    const findUser = await this.userService.findUserbyId(tokenDto.id)

    const newOrder = new Order()
    newOrder.status = order.status
    newOrder.total = order.total
    newOrder.user = findUser
    
    await this.orderRepository.create(newOrder)
    const OrdersUserTotal = await this.userService.getOdersFromUser(tokenDto.id)

    return OrdersUserTotal
  }
}
