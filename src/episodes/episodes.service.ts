import { Injectable, HttpService } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable()
export class EpisodesService {
  constructor(private _httpService: HttpService) { }

  getTopEpisodes(id: number): any {
    return this._httpService
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=dd1b0143dd84aea4692c8b3f0045b050&language=en-US`,
      )
      .pipe(
        switchMap(result =>
          forkJoin([
            this._httpService.get(
              `https://api.themoviedb.org/3/tv/${id}/season/${1}?api_key=dd1b0143dd84aea4692c8b3f0045b050&language=en-US`,
            ),
            this._httpService.get(
              `https://api.themoviedb.org/3/tv/${id}/season/${2}?api_key=dd1b0143dd84aea4692c8b3f0045b050&language=en-US`,
            ),
          ]),
        )
      );
  }
}
