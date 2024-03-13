import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientCreditsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.PAYMENT_REQUIRED);
    this.name = 'InsufficientCreditsException';
  }
}