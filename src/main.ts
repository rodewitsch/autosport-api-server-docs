import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupApp(app);
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
