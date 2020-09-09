import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mockResponse } from './episodes.mock';

import 'jest-extended';

describe('EpisodesController', () => {
  let _episodesController: EpisodesController;
  let _episodesService: EpisodesService;

  beforeEach(() => {
    _episodesService = new EpisodesService(
      new HttpService(),
      new ConfigService(),
    );
    _episodesController = new EpisodesController(_episodesService);
  });

  describe('getTopEpisodes', () => {
    it('should be an array', async () => {
      jest
        .spyOn(_episodesService, 'getTopEpisodes')
        .mockImplementation(() => mockResponse);

      expect(await _episodesController.getTopEpisodes(1100)).toBeArray();
    });

    it('should return 404', async () => {
      jest.spyOn(_episodesService, 'getTopEpisodes').mockImplementation(() => ({
        statusCode: 404,
        message: 'Not Found',
      }));

      expect(
        await _episodesController.getTopEpisodes(110231431241234140),
      ).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
