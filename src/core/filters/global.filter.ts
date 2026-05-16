import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();
    
    
    res.status(exception.getStatus()).json({ statusCode: exception.getStatus(), message: exception.message,error:exception.getResponse() });
  }
}