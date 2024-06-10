import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AddDriverTiresBodyDtoV2 {
  @ApiProperty({
    description: 'Tires name',
  })
  name: string;

  @ApiProperty({
    description: 'Main tires',
  })
  main: boolean;
}

export class UpdateDriverTiresBodyDtoV2 extends AddDriverTiresBodyDtoV2 {}

@Exclude()
export class DriverTiresResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Tires id',
  })
  tires_id: number;

  @Expose()
  @ApiProperty({
    description: 'Tires name',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Main tires',
  })
  main: boolean;

  constructor(partial: Partial<DriverTiresResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
