import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('api')
export class EpisodesController {
  constructor(private readonly _episodesService: EpisodesService) {}

  @Get('/episodes/:id')
  getTopEpisodes(@Param() params: { id: number }): any {
    return this._episodesService.getTopEpisodes(params.id);
  }
}
