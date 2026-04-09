import { HttpException, HttpStatus } from '@nestjs/common';

export class ActivationExistsException extends HttpException {
  constructor(promocodeId: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message: `Activation for promocode "${promocodeId}" already exists`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
