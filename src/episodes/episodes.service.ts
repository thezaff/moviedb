import { Injectable, HttpService, CacheModule, Inject } from '@nestjs/common';
import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AnalyticsService } from 'src/analytics/analytics.service';

const key = 'dd1b0143dd84aea4692c8b3f0045b050';
const url = 'https://api.themoviedb.org/3/tv';
const lang = 'language=en-US';

@Injectable()
export class EpisodesService {
  constructor(
    private _httpService: HttpService,
    private readonly _analyticsService: AnalyticsService,
  ) {}

  getTopEpisodes(id: number): any {
    const getSeason = (seasonNumber: number) =>
      this._httpService
        .get(`${url}/${id}/season/${seasonNumber}?api_key=${key}&${lang}`)
        .pipe(
          map(season =>
            season.data.episodes.map(ep => ({
              episodeName: ep.name,
              averageVotes: ep.vote_average,
            })),
          ),
        );

    return this._httpService.get(`${url}/${id}?api_key=${key}&${lang}`).pipe(
      tap(({ data }) =>
        this._analyticsService.updateSeriesAccessCount(id, data.name),
      ),
      switchMap(({ data }) => {
        return forkJoin(data.seasons.map((season, idx) => getSeason(idx)));
      }),
      map(data =>
        []
          .concat(...data)
          .sort((a, b) => b.averageVotes - a.averageVotes)
          .slice(0, 20),
      ),
    );
  }
}
