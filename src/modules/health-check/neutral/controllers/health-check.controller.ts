import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { LogConfig } from 'general/decorators/log-config.decorator';

@Controller('health-check')
@LogConfig({ onlyErrors: true })
@ApiTags('Health Check')
export class HealthCheckControllerNeutral {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
    ]);
  }
}
