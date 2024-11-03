import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import IAppConfigVariables from './interfaces/config.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const configService = new ConfigService<IAppConfigVariables>();
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: configService.get<number>('APP_PORT'),
      host: configService.get<string>('APP_HOST'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));

  Logger.log(
    `Microservice is running on ${configService.get<string>('APP_HOST')}:${configService.get<number>('APP_PORT')}`,
  );
  Logger.log(
    `Health check is running on ${configService.get<string>('APP_HOST')}:${configService.get<number>('APP_PORT')}/health`,
  );
}
bootstrap();
