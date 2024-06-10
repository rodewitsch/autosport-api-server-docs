import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class GetClassifierResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Classifier type',
  })
  type: number;

  @Expose()
  @ApiProperty({
    description: 'Classifier code',
  })
  code: number;

  @Expose()
  @ApiProperty({
    description: 'Classifier lexeme 1',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  lex1: Translations;

  @Expose()
  @ApiProperty({
    description: 'Classifier lexeme 2',
  })
  lex2: string;

  @Expose()
  @ApiProperty({
    description: 'Classifier lexeme 3',
  })
  lex3: string;

  constructor(partial: Partial<GetClassifierResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
