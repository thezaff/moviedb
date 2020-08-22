import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AnalyticsService {
  constructor(private _httpService: HttpService) {}

  getPopularSeries(): any {
    return 'analytics';
  }
}
