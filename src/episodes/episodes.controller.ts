import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';

@UseInterceptors(CacheInterceptor)
@Controller('api')
export class EpisodesController {
  constructor(private readonly _episodesService: EpisodesService) {}

  @Get('/episodes/:id')
  getTopEpisodes(@Param() params: { id: number }): any {
    return this._episodesService.getTopEpisodes(params.id);
  }
}

/* 
  TODO:
  1. Decorator over Episodes controller, to log accessed series using analytics service
  2. Define filesystem volume for Redis
*/
