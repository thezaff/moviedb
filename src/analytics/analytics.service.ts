import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AnalyticsService {
  constructor(private _httpService: HttpService) {}

  getPopularSeries(): any {
    return this._httpService
      .get(
        'http://api.themoviedb.org/3/movie/550?api_key=dd1b0143dd84aea4692c8b3f0045b050',
      )
      .pipe(map(response => response.data));
  }
}
