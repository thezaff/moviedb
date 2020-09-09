import * as redisStore from 'cache-manager-redis-store';
import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';

const _redisStore = CacheModule.register({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: 86400,
});

@Module({
  imports: [HttpModule, _redisStore, AnalyticsModule, ConfigModule],
  providers: [EpisodesService],
  controllers: [EpisodesController],
})
export class EpisodesModule {}
