import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { AnalyticsService } from 'src/analytics/analytics.service';

// @UseInterceptors(CacheInterceptor)
@Controller('topEpisodes')
export class EpisodesController {
  constructor(
    private readonly _episodesService: EpisodesService,
    private readonly _analyticsService: AnalyticsService,
  ) {}

  @Get('/:id')
  async getTopEpisodes(@Param() params: { id: number }) {
    return this._episodesService.getTopEpisodes(params.id);
  }
}
