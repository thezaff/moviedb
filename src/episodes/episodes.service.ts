import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { map, switchMap, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';

const lang = 'language=en-US';

@Injectable()
export class EpisodesService {
  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
  ) {}

  getTopEpisodes(id: number): any {
    const API_KEY = this._configService.get<string>('TMDB_API_KEY');
    const API_URL = this._configService.get<string>('TMDB_API_URL');

    const getSeason = (seasonNumber: number) =>
      this._httpService
        .get(
          `${API_URL}/${id}/season/${seasonNumber}?api_key=${API_KEY}&${lang}`,
        )
        .pipe(
          map(season =>
            season.data.episodes.map(ep => ({
              episodeName: ep.name,
              averageVotes: ep.vote_average,
            })),
          ),
        );

    const getSeries = () =>
      this._httpService.get(`${API_URL}/${id}?api_key=${API_KEY}&${lang}`);

    const getEpisodes = data => {
      const seriesName = data.name;

      return forkJoin(
        data.seasons.map(season => getSeason(season.season_number)),
      ).pipe(
        map(data => ({
          seriesName: seriesName,
          topEpisodes: []
            .concat(...data)
            .sort((a, b) => b.averageVotes - a.averageVotes)
            .slice(0, 20),
        })),
      );
    };

    return getSeries().pipe(
      switchMap(({ data }) => getEpisodes(data)),
      catchError(err => {
        throw new HttpException(err.response.statusText, err.response.status);
      }),
    );
  }
}
