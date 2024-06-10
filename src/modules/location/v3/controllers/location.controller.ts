import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  GetLocationConfigDragRaceResultsResponseDtoV3,
  GetLocationConfigResultsQueryDtoV3,
  GetLocationConfigTimeAttackResultsResponseDtoV3,
} from '../dto/get-location-config-results.dto';
import { GetLocationConfigsQueryDtoV3, GetLocationConfigsResponseDtoV3 } from '../dto/get-location-configs.dto';
import { GetLocationsQueryDtoV3, GetLocationsResponseDtoV3 } from '../dto/get-locations.dto';

@Controller({
  path: 'locations',
  version: '3',
})
@ApiTags('Location')
@LogConfig({ onlyErrors: true })
export class LocationControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get locations' })
  @ApiResponses({
    200: [GetLocationsResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocations(@Query() query: GetLocationsQueryDtoV3) {}

  @Get(':location_id/configs')
  @ApiOperation({ summary: 'Get location configs' })
  @ApiResponses({
    200: [GetLocationConfigsResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationConfigs(@Param('location_id') location_id: string, @Query() query: GetLocationConfigsQueryDtoV3) {}

  @Get(':location_id/configs/:config_id')
  @ApiResponses({
    200: GetLocationConfigsResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationConfig(@Param('location_id') location_id: string, @Param('config_id') config_id: string) {}

  @Get(':location_id/configs/:config_id/results')
  @ApiResponse({
    status: 200,
    description: 'Event results',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            { $ref: '#/components/schemas/GetTimeAttackResultsResponseDtoV2' },
            { $ref: '#/components/schemas/GetDragResultsResponseDtoV2' },
          ],
        },
        examples: {
          'TIME-ATTACK': {
            value: [
              {
                lap_number: 9,
                event_id: 150,
                tires_name: 'белшина',
                vehicle_name: 'Chevrolet',
                driver_id: 1296,
                first_name: 'Андрей',
                last_name: 'Игнатович',
                group_number: 1,
                lap_time: '00:00.120',
                c_road_condition: 1,
                power_den_class_id: 1,
                penalty_time: null,
                canceled: false,
              },
            ],
          },
          DRAG: {
            value: [
              {
                lap_number: 1,
                event_id: 156,
                tires_name: null,
                vehicle_name: null,
                driver_id: 883,
                first_name: 'string4',
                last_name: 'string',
                group_number: 1,
                lap_time: '12.248000',
                c_road_condition: 1,
                power_den_class_id: null,
                penalty_time: null,
                canceled: false,
              },
            ],
          },
        },
      },
    },
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @ApiExtraModels(GetLocationConfigTimeAttackResultsResponseDtoV3, GetLocationConfigDragRaceResultsResponseDtoV3)
  async getLocationConfigResults(
    @I18n() i18n: I18nContext,
    @Param('location_id') location_id: string,
    @Param('config_id') config_id: string,
    @Query() query: GetLocationConfigResultsQueryDtoV3,
  ) {}

  @Get('/:location_id/photo')
  @ApiOperation({ summary: 'Get location photo' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Location photo, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationPhoto(
    @Param('location_id') id: string,
    @Query() _: RefreshCacheQueryDto,
    @Res() response: Response,
  ) {}
}
