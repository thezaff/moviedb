import { Injectable, HttpService, CacheModule } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

const key = 'dd1b0143dd84aea4692c8b3f0045b050';
const url = 'https://api.themoviedb.org/3/tv';
const lang = 'language=en-US';

@Injectable()
export class EpisodesService {
  constructor(
    private _httpService: HttpService,
    private _redisCache: CacheModule,
  ) {}

  getTopEpisodes(id: number): any {
    // const redisClient = this._redisCache.store.getClient()

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
