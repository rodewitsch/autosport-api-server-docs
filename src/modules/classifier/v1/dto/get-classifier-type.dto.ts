import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetClassifierTypeResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Classifier type',
  })
  type: number;

  @Expose()
  @ApiProperty({
    description: 'Classifier type name',
  })
  name: string;

  constructor(partial: Partial<GetClassifierTypeResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
