import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('MovieDB Service API')
    .setDescription('Service for getting series info from external TMDB API')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);

  SwaggerModule.setup('/', app, swaggerDoc);

  await app.listen(3000);
}
bootstrap();
