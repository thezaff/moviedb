import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsDTO {
  @ApiProperty()
  episodeName: string;

  @ApiProperty()
  accessCount: number;
}
