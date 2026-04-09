import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor() {
        super(
            {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Not found',
                message: `Entity not found`,
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
