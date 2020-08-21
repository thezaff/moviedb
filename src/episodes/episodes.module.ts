import { Module, HttpModule } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';

@Module({
  imports: [HttpModule],
  providers: [EpisodesService],
  controllers: [EpisodesController],
})
export class EpisodesModule {}
