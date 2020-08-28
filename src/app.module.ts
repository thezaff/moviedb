import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EpisodesModule,
    AnalyticsModule,
    MongooseModule.forRoot('mongodb://localhost/moviedb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
