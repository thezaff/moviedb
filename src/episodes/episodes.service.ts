import { Injectable, HttpService } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

// TODO: Move key to an .env file
const key = 'dd1b0143dd84aea4692c8b3f0045b050';
const url = 'https://api.themoviedb.org/3/tv';
const lang = 'language=en-US';

@Injectable()
export class EpisodesService {
  constructor(private _httpService: HttpService) {}

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

    const getSeries = () =>
      this._httpService.get(`${url}/${id}?api_key=${key}&${lang}`);

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

    return getSeries().pipe(switchMap(({ data }) => getEpisodes(data)));
  }
}
