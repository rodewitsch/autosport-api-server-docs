import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class GetAgreementQueryDtoV1 {
  @ApiProperty({
    description: 'Agreement type (code)',
  })
  c_agreement: number;
}

@Exclude()
export class GetAgreementResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Agreement type (type)',
  })
  t_agreement: number;

  @Expose()
  @ApiProperty({
    description: 'Agreement type (code)',
  })
  c_agreement: number;

  @Expose()
  @ApiProperty({
    description: 'Agreement type',
    type: 'string',
  })
  agreement: string;

  @Expose()
  @ApiProperty({
    description: 'Agreement description',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Agreement text (base64)',
    type: 'string',
  })
  @Transform(({ value }) => value?.toString('base64'))
  text: Buffer;

  constructor(partial: Partial<GetAgreementResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
