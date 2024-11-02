import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import IAppConfigVariables from './interfaces/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const config = new DocumentBuilder()
    .setTitle('API Gateway example')
    .setDescription('The API gateway API description')
    .setVersion('1.0')
    .addTag('API Gateway')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const configService =
    app.get<ConfigService<IAppConfigVariables>>(ConfigService);
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
