import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function configSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Promocode generator API')
    .setDescription('The Promocode generator API description')
    .setVersion('1.0')
    .addTag('Promocode generator API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  configSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
