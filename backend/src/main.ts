import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('VEPR API')
    .setDescription('Interactive API for VEPR')
    .setVersion('0.1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (validationErrors: ValidationError[] = []) => {
  //       return new BadRequestException(validationErrors);
  //     },
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
