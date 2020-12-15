import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8085, () => {
    Logger.log('Questionnaire Service is running on port 8085!');
  });
}
bootstrap();
