import { HttpException, HttpStatus } from '@nestjs/common';

export class PromocodeExpiredException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Conflict',
        message: `Promocode is expired`,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
