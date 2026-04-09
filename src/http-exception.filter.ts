
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFileSync } from 'fs';
import { join } from 'path';

const LOG_FILE = join(process.cwd(), 'error.log');

function writeErrorLog(entry: Record<string, unknown>): void {
  const line = JSON.stringify(entry) + '\n';
  appendFileSync(LOG_FILE, line, 'utf8');
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body =
      exception instanceof HttpException
        ? exception.getResponse()
        : { statusCode: status, error: 'Internal Server Error', message: 'An unexpected error occurred' };

    const timestamp = new Date().toISOString();

    writeErrorLog({
      timestamp,
      status,
      path: request.url,
      method: request.method,
      body,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      ...(typeof body === 'object' ? body : { message: body }),
      timestamp,
      path: request.url,
    });
  }
}
