import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import morgan from 'morgan';
import { GlobalFilter } from '@/core/filters/global.filter';
import cookieParser  from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: 'http://localhost:3000',credentials:true });
  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalFilter());
  app.use(morgan('dev'));
  app.use(cookieParser())

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });

  await app.listen(process.env.PORT ?? 8888);
}

bootstrap();
// Layered architecture
// DDD - Domain-Driven Design