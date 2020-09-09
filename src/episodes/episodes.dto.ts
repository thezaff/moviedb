import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDTO {
  @ApiProperty()
  episodeName: string;

  @ApiProperty({ maximum: 10 })
  averageVotes: number;
}

export class TopEpisodesResponseDTO {
  @ApiProperty()
  seriesName: string;

  @ApiProperty({ type: EpisodeDTO, isArray: true, maxItems: 20 })
  topEpisodes: EpisodeDTO[];
}
