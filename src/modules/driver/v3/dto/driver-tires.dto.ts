import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AddDriverTiresBodyDtoV3 {
  @ApiProperty({
    description: 'Tires name',
  })
  name: string;

  @ApiProperty({
    description: 'Main tires',
  })
  main: boolean;
}

export class UpdateDriverTiresBodyDtoV3 extends AddDriverTiresBodyDtoV3 {}

@Exclude()
export class DriverTiresResponseDtoV3 {
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

  constructor(partial: Partial<DriverTiresResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
