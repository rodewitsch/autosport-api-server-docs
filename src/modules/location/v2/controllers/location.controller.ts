import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  GetLocationConfigResultsQueryDtoV2,
  GetLocationConfigTimeAttackResultsResponseDtoV2,
} from '../dto/get-location-config-results.dto';
import { GetLocationConfigsQueryDtoV2, GetLocationConfigsResponseDtoV2 } from '../dto/get-location-configs.dto';
import { GetLocationsQueryDtoV2, GetLocationsResponseDtoV2 } from '../dto/get-locations.dto';

@Controller({
  path: 'locations',
  version: '2',
})
@ApiTags('Location')
@LogConfig({ onlyErrors: true })
export class LocationControllerV2 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get locations' })
  @ApiResponses({
    200: [GetLocationsResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocations(@Query() query: GetLocationsQueryDtoV2) {}

  @Get(':location_id/configs')
  @ApiOperation({ summary: 'Get location configs' })
  @ApiResponses({
    200: [GetLocationConfigsResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationConfigs(@Param('location_id') location_id: string, @Query() query: GetLocationConfigsQueryDtoV2) {}

  @Get(':location_id/configs/:config_id')
  @ApiResponses({
    200: GetLocationConfigsResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationConfig(@Param('location_id') location_id: string, @Param('config_id') config_id: string) {}

  @Get(':location_id/configs/:config_id/results')
  @ApiResponses({
    200: [GetLocationConfigTimeAttackResultsResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getLocationConfigResults(
    @I18n() i18n: I18nContext,
    @Param('location_id') location_id: string,
    @Param('config_id') config_id: string,
    @Query() query: GetLocationConfigResultsQueryDtoV2,
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
