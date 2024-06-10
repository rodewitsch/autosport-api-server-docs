import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class GetChampionshipClassResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Championship class id',
  })
  championship_class_id: number;

  @Expose()
  @ApiProperty({
    description: 'Championship id',
  })
  championship_id: number;

  @Expose()
  @ApiProperty({
    description: 'Championship class name',
  })
  name: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Championship description',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  description?: Translations;

  @Expose()
  @ApiProperty({
    description: 'Championship color',
    type: 'string',
  })
  color: string;

  @Expose()
  @ApiProperty({
    description: 'Championship color (additional, for gradient)',
    type: 'string',
  })
  color_2: string;

  constructor(partial: Partial<GetChampionshipClassResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
