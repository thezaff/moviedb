import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
  constructor(private readonly _analyticsService: AnalyticsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();

    return next.handle().pipe(
      tap(response =>
        this._analyticsService.updateSeriesAccessCount(
          req.params.id,
          response.seriesName,
        ),
      ),
      map(data => data.topEpisodes),
    );
  }
}
