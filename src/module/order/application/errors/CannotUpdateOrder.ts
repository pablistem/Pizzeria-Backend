import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class CannotUpdateOrderException extends UnauthorizedException {
  message = 'Order status is not pending, you cannot update it';
}

export class CannotAccessOrderException extends NotFoundException{
  message: 'Order not found or do not have access to these'
}