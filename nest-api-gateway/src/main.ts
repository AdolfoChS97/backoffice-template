import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import IAppConfigVariables from './interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const configService =
    app.get<ConfigService<IAppConfigVariables>>(ConfigService);
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
