import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    EpisodesModule,
    AnalyticsModule,
    MongooseModule.forRoot('mongodb://mongo:27017/moviedb'),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
