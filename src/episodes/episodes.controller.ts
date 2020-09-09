import { Controller, Get, Param, Res } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { AnalyticsInterceptor } from '../analytics/analytics.interceptor';
import { TopEpisodesResponseDTO, EpisodeDTO } from './episodes.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('topEpisodes')
export class EpisodesController {
  constructor(private readonly _episodesService: EpisodesService) {}

  @ApiOkResponse({ type: EpisodeDTO, isArray: true })
  @UseInterceptors(AnalyticsInterceptor, CacheInterceptor)
  @Get('/:id')
  getTopEpisodes(@Param('id') id: number): Promise<TopEpisodesResponseDTO> {
    return this._episodesService.getTopEpisodes(id);
  }
}
