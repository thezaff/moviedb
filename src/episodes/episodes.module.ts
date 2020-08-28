import * as redisStore from 'cache-manager-redis-store';
import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 600,
    }),
  ],
  providers: [EpisodesService],
  controllers: [EpisodesController],
})
export class EpisodesModule {}
