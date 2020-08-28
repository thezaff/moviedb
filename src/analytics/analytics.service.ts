import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private _analyticsModel: Model<Analytics>,
  ) {}

  getPopularSeries(): Promise<any[]> {
    return this._analyticsModel
      .find({})
      .sort({ accessCount: -1 })
      .limit(5)
      .exec()
      .then(data =>
        data.map(i => ({
          seriesName: i.seriesName,
          accessCount: i.accessCount,
        })),
      );
  }

  async updateSeriesAccessCount(
    seriesId: number,
    seriesName: string,
  ): Promise<Analytics> {
    const filter = { _id: seriesId };
    const update = { seriesName, $inc: { accessCount: 1 } };

    return this._analyticsModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
  }
}
