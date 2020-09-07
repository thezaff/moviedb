import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { AnalyticsInterceptor } from '../analytics/analytics.interceptor';

@Controller('topEpisodes')
export class EpisodesController {
  constructor(private readonly _episodesService: EpisodesService) {}

  @UseInterceptors(AnalyticsInterceptor, CacheInterceptor)
  @Get('/:id')
  async getTopEpisodes(@Param() params: { id: number }) {
    return this._episodesService.getTopEpisodes(params.id);
  }
}
