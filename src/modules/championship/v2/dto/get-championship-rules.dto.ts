import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetChampionshipRulesResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Rules text',
    type: 'string',
  })
  @Transform(({ value }) => value.toString('base64'))
  text: Buffer;

  constructor(partial: Partial<GetChampionshipRulesResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
