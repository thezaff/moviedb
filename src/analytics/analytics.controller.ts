import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AnalyticsDTO } from './analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly _analyticsService: AnalyticsService) {}

  @ApiOkResponse({ type: AnalyticsDTO, isArray: true })
  @Get('/popularSeries')
  getPopularSeries(): Promise<AnalyticsDTO[]> {
    return this._analyticsService.getPopularSeries();
  }
}
