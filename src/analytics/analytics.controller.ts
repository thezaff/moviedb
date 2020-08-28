import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly _analyticsService: AnalyticsService) {}

  @Get('/popularSeries')
  getPopularSeries(): any {
    return this._analyticsService.getPopularSeries();
  }
}
