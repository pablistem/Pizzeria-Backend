import { UnauthorizedException } from '@nestjs/common';

export class CannotUpdateOrderException extends UnauthorizedException {
  message = 'Order status is not pending, you cannot update it';
}
