import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsInt, IsOptional } from 'class-validator';
import { LimitOffsetQueryDto } from 'general/dto/limit-offset.query.dto';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';
import { Coordinates } from '../../../location/v2/dto/get-locations.dto';
import { EventType } from '../enums/event-type.enum';

export class GetEventQueryDtoV2 {
  @ApiPropertyOptional({ description: 'Return with image', default: false })
  @IsOptional()
  @IsIn([true, false])
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  image?: boolean;
}

export class GetEventsQueryDtoV2 extends PartialType(LimitOffsetQueryDto) {
  event_id?: number;

  @ApiPropertyOptional({
    description: 'Event status',
    enum: EventType,
  })
  @IsOptional()
  status?: EventType;

  @ApiPropertyOptional({
    description: 'Organizer id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  organizer_id?: number;

  @ApiPropertyOptional({
    description: 'Championship id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  championship_id?: number;

  @ApiPropertyOptional({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
    default: 1,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  @IsOptional()
  c_race_type?: RaceType;

  @ApiPropertyOptional({
    description: 'Event year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({
    description: 'Driver id (for authorized users)',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  driver_id?: number;
}

@Exclude()
export class RequiredDocumentsResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Driver document type (code)',
  })
  c_driver_document_type: number;

  @Expose()
  @ApiProperty({
    description: 'Driver document type',
  })
  @Transform(({ value }) => getTranslation(value))
  driver_document_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Mandatory driver document',
  })
  required: boolean;

  constructor(partial: Partial<RequiredDocumentsResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class WeatherConditionResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Weather condition id',
    externalDocs: {
      description: 'Weather condition list',
      url: 'https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2',
    },
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: 'Group of weather parameters (Rain, Snow etc.)',
  })
  main: string;

  @Expose()
  @ApiProperty({
    description: 'Weather condition within the group',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Weather condition icon',
    externalDocs: {
      description: 'Weather condition icons',
      url: 'https://openweathermap.org/weather-conditions#How-to-get-icon-URL',
    },
  })
  icon: string;

  constructor(partial: Partial<WeatherConditionResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EventWeatherResponseDtoV2 {
  @ApiProperty({
    description: 'Requested time',
  })
  dt: number;

  @ApiProperty({
    description: 'Sunrise time',
  })
  sunrise: number;

  @ApiProperty({
    description: 'Sunset time',
  })
  sunset: number;

  @Expose()
  @ApiProperty({
    description: 'Temperature',
  })
  @Transform(({ value }) => value && Math.round(value[0] || value))
  temp: number;

  @Expose()
  @ApiProperty({
    description: 'Temperature feels like',
  })
  @Transform(({ value }) => value && Math.round(value[0] || value))
  feels_like: number;

  pressure: number;

  humidity: number; //%

  dew_point: number;

  clouds: number; //%

  uvi?: number = null; // UV index / max (onecall)

  visibility?: number = null; // Average visibility, metres, max value is 10km

  wind_speed: number;

  wind_gust?: number = null; // A brief increase in the speed of the wind, usually less than 20 seconds

  wind_deg: number;

  @Expose({ name: 'weather_conditions' })
  @ApiProperty({
    name: 'weather_conditions',
    description: 'Weather conditions',
    type: WeatherConditionResponseDtoV2,
  })
  @Transform(({ value }) => value && new WeatherConditionResponseDtoV2(value[0]))
  @Type(() => WeatherConditionResponseDtoV2)
  weather: WeatherConditionResponseDtoV2;

  @Expose({ name: 'c_weather_conditions' })
  @ApiProperty({
    name: 'c_weather_conditions',
    description: 'Weather condition (code)',
  })
  c_weather_rl: number;

  pop?: number = null; // Probability of precipitation

  rain?: any = null; // Precipitation, mm/h ||  Precipitation volume, mm (onecall)

  snow?: any = null; // Precipitation, mm/h ||  Snow volume, mm (onecall)

  constructor(partial: Partial<EventWeatherResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EventRegistrationInfoResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Member status (code)',
  })
  c_member_status: number;

  @Expose()
  @ApiProperty({
    description: 'Group number (code)',
  })
  c_group_num: number;

  @Expose()
  @ApiProperty({
    description: 'Group number',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  group_num: Translations;

  @Expose()
  @ApiProperty({
    description: 'Check in status',
  })
  check_in: boolean;

  @Expose()
  @ApiProperty({
    description: 'Start number',
  })
  start_num: number;

  constructor(partial: Partial<EventRegistrationInfoResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetEventResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Event id',
  })
  event_id: number;

  @Expose()
  @ApiProperty({
    description: 'Organizer id',
  })
  organizer_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location id',
  })
  location_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  location_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Location config id',
  })
  location_config_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location coordinates',
    example: {
      lng: 24.123,
      lat: 56.123,
    },
  })
  @Transform(({ value }) => ({ lng: value.x, lat: value.y }))
  @Type(() => Coordinates)
  location_coordinates: Coordinates;

  @Expose()
  @ApiProperty({
    description: 'Location config name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  location_config_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Event type (code)',
  })
  c_event_type: number;

  @Expose()
  @ApiProperty({
    description: 'Event type',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  event_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Road condition (code)',
  })
  c_road_condition: number;

  @Expose()
  @ApiProperty({
    description: 'Event name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  name: Translations;

  @Expose({ name: 'image_url' })
  @ApiProperty({
    name: 'image_url',
    description: 'Event image url',
    type: 'string',
  })
  @Transform(({ obj }) => (obj.image ? `/api/v2/events/${obj.event_id}/image?d=${obj.updated_at}` : null))
  image_url: Buffer;

  @Expose()
  @ApiPropertyOptional({
    description: 'Event image',
    type: 'string',
  })
  @Transform(({ obj }) => obj.event_image && obj.event_image?.toString('base64'))
  image?: string;

  updated_at: string;

  @Expose()
  @ApiProperty({
    description: 'Dominant event image color',
    type: 'string',
  })
  dominant_image_color: string;

  @Expose()
  @ApiProperty({ description: 'Image is light' })
  is_light: boolean;

  @Expose()
  @ApiProperty({
    description: 'Short event description',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value) || '')
  short_description: Translations;

  @Expose()
  @ApiProperty({
    description: 'Event description',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value) || '')
  description: Translations;

  @Expose()
  @ApiProperty({
    description: 'Event date start',
  })
  date_start: Date;

  @Expose()
  @ApiProperty({
    description: 'Event date end',
  })
  date_end: Date;

  @Expose()
  @ApiProperty({
    description: 'Event race type (code)',
  })
  c_race_type: RaceType;

  @Expose()
  @ApiProperty({
    description: 'Event race type',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  race_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Organizer name',
  })
  @Transform(({ value }) => getTranslation(value))
  organizer_name: string;

  @Expose()
  @ApiProperty({
    description: 'Event status (code)',
  })
  c_event_status: number;

  @Expose()
  @ApiProperty({
    description: 'Event status',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  event_status: Translations;

  @Expose()
  @ApiProperty({
    description: 'Members count',
  })
  members_count: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Championship rules id',
  })
  championship_rules_id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Event rules id',
  })
  rules_id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Championship id',
  })
  championship_id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Member status (code)',
  })
  c_member_status?: number = null;

  @Expose()
  @ApiProperty({
    description: 'Required documents',
    type: [RequiredDocumentsResponseDtoV2],
  })
  @Type(() => RequiredDocumentsResponseDtoV2)
  @Transform(({ value }) => (value ? value.map((document) => new RequiredDocumentsResponseDtoV2(document)) : []))
  required_documents: RequiredDocumentsResponseDtoV2[] = [];

  @Expose()
  @ApiPropertyOptional({
    description: 'Registration price',
    type: 'number',
  })
  @Transform(({ value }) => value && Number(value))
  registration_price?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Registration date from',
  })
  registration_date_start?: Date;

  @Expose()
  @ApiPropertyOptional({
    description: 'Registration date to',
  })
  registration_date_end?: Date;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver registration info (only for authorized drivers)',
    type: EventRegistrationInfoResponseDtoV2,
  })
  @Transform(({ value }) => value && new EventRegistrationInfoResponseDtoV2(value))
  registration_info: EventRegistrationInfoResponseDtoV2;

  @Expose()
  @ApiPropertyOptional({
    description: 'Event weather',
    type: EventWeatherResponseDtoV2,
  })
  @Transform(
    ({ obj }) => obj.weather && new EventWeatherResponseDtoV2({ ...obj.weather, c_weather_rl: obj.c_weather_rl }),
  )
  weather?: EventWeatherResponseDtoV2;

  constructor(partial: Partial<GetEventResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
