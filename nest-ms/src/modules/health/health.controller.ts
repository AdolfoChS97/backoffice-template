import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import IAppConfigVariables from 'src/interfaces/config.interface';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService<IAppConfigVariables>,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'microservice-app',
          `http://${this.configService.get('APP_HOST')}:${this.configService.get('APP_PORT')}`,
        ),
    ]);
  }
}
