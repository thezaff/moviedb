import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private _analyticsModel: Model<Analytics>,
  ) {}

  getPopularSeries(): Promise<Analytics[]> {
    return this._analyticsModel.find().exec();
  }

  updateSeriesAccessCount(): Promise<Analytics[]> {
    return this._analyticsModel.find({}).exec();
  }
}
