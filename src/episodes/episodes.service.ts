import { Injectable, HttpService } from '@nestjs/common';
import {
  scan,
  map,
  tap,
  flatMap,
  switchMap,
  toArray,
  combineAll,
  mergeMap,
} from 'rxjs/operators';
import { forkJoin } from 'rxjs';

const key = 'dd1b0143dd84aea4692c8b3f0045b050';
const url = 'https://api.themoviedb.org/3/tv';
const lang = 'language=en-US';

@Injectable()
export class EpisodesService {
  constructor(private _httpService: HttpService) {}

  getTopEpisodes(id: number): any {
    const getSeason = seasonNumber =>
      this._httpService
        .get(`${url}/${id}/season/${seasonNumber}?api_key=${key}&${lang}`)
        .pipe(map(season => season.data.episodes));

    return this._httpService.get(`${url}/${id}?api_key=${key}&${lang}`).pipe(
      switchMap(({ data }) =>
        forkJoin(data.seasons.map((season, idx) => getSeason(idx))),
      ),
      mergeMap(data => data),
    );
  }
}
