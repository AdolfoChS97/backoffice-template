import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import IAppConfigVariables from './interfaces/config.interface';

async function bootstrap() {
  const configService = new ConfigService<IAppConfigVariables>();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: configService.get<number>('APP_PORT'),
        host: configService.get<string>('APP_HOST'),
      },
    },
  );
  await app.listen();
}
bootstrap();
