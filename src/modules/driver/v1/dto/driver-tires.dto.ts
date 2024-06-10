import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AddDriverTiresBodyDtoV1 {
  @ApiProperty({
    description: 'Tires name',
  })
  name: string;

  @ApiProperty({
    description: 'Main tires',
  })
  main: boolean;
}

export class UpdateDriverTiresBodyDtoV1 extends AddDriverTiresBodyDtoV1 {}

@Exclude()
export class DriverTiresResponseDtoV1 {
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

  constructor(partial: Partial<DriverTiresResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
