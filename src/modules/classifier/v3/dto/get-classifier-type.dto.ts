import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetClassifierTypeResponseDtoV3 {
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

  constructor(partial: Partial<GetClassifierTypeResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
