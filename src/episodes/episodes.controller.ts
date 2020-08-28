import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';

/** TODO: Uncomment cache interceptor,
 * once AnalyticsService.updateSeriesAccessCount added as side-effect before `get` response
 **/
// @UseInterceptors(CacheInterceptor)
@Controller('topEpisodes')
export class EpisodesController {
  constructor(private readonly _episodesService: EpisodesService) {}

  @Get('/:id')
  async getTopEpisodes(@Param() params: { id: number }) {
    return this._episodesService.getTopEpisodes(params.id);
  }
}
