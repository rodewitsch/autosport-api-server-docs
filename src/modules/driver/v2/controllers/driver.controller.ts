import { Body, Controller, Get, Headers, HttpCode, Param, Post, Query, Res, Session } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { AddDriverBodyDtoV2, AddDriverResponseDtoV2 } from '../dto/add-driver.dto';
import {
  GetDriverParticipationYearsOldResponseDtoV2,
  GetDriverParticipationYearsResponseDtoV2,
} from '../dto/get-driver-participation-years';
import { GetDriverRatingQueryDtoV2, GetDriverRatingResponseDtoV2 } from '../dto/get-driver-rating.dto';
import { GetDriverRecordsQueryDtoV2, GetDriverTimeAttackRecordsResponseDtoV2 } from '../dto/get-driver-records.dto';
import { GetDriverStatisticsQueryDtoV2, GetDriverStatisticsResponseDtoV2 } from '../dto/get-driver-statistics.dto';

@Controller({
  path: 'drivers',
  version: '2',
})
@ApiTags('Driver')
@LogConfig({ onlyErrors: true })
export class DriverControllerV2 {
  constructor() {}

  @Get('rating')
  @ApiOperation({ summary: 'Get drivers rating' })
  @ApiResponses({
    200: [GetDriverRatingResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriversRating(@Query() query: GetDriverRatingQueryDtoV2) {}

  @Get('/:driver_id/participation/years')
  @ApiOperation({ summary: 'Get driver events participation years' })
  @ApiResponses({
    200: [GetDriverParticipationYearsOldResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverParticipationYearsOld(@Param('driver_id') driver_id: string) {}

  @Get('/:driver_id/events/participation/years')
  @ApiOperation({ summary: 'Get driver events participation years' })
  @ApiResponses({
    200: [GetDriverParticipationYearsResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverParticipationYears(@Param('driver_id') driver_id: string) {}

  @Get('/:driver_id/photo')
  @ApiOperation({ summary: 'Get driver photo' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Event image, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverPhoto(
    @Param('driver_id') driver_id: string,
    @Query() _: RefreshCacheQueryDto,
    @Res() response: Response,
  ) {}

  @Get('/:driver_id/records')
  @ApiOperation({ summary: 'Get driver records' })
  @ApiResponses({
    200: [GetDriverTimeAttackRecordsResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverRecords(@Param('driver_id') driver_id: string, @Query() query: GetDriverRecordsQueryDtoV2) {}

  @Get('/:driver_id/statistics')
  @ApiOperation({ summary: 'Get driver statistics' })
  @ApiResponses({
    200: GetDriverStatisticsResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverStatistics(@Param('driver_id') driver_id: string, @Query() query: GetDriverStatisticsQueryDtoV2) {}

  @Post()
  @ApiOperation({ summary: 'Create account of driver' })
  @ApiResponses({
    200: AddDriverResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @LogConfig({ responseData: true })
  @HttpCode(200)
  @Auth([AppRole.USER])
  async addDriver(@Session() profileData: ProfileData, @Body() body: AddDriverBodyDtoV2, @Headers() headers: any) {}
}
