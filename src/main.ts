import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(app.get(ConfigService).get('APP_PORT') || 3000, '0.0.0.0');
}
bootstrap();
