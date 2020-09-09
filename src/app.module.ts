import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EpisodesModule,
    AnalyticsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        uri: _configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
