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
import { AddDriverBodyDtoV3, AddDriverResponseDtoV3 } from '../dto/add-driver.dto';
import {
  GetDriverParticipationYearsOldResponseDtoV3,
  GetDriverParticipationYearsResponseDtoV3,
} from '../dto/get-driver-participation-years';
import { GetDriverRatingQueryDtoV3, GetDriverRatingResponseDtoV3 } from '../dto/get-driver-rating.dto';
import { GetDriverRecordsQueryDtoV3, GetDriverTimeAttackRecordsResponseDtoV3 } from '../dto/get-driver-records.dto';
import { GetDriverStatisticsQueryDtoV3, GetDriverStatisticsResponseDtoV3 } from '../dto/get-driver-statistics.dto';

@Controller({
  path: 'drivers',
  version: '3',
})
@ApiTags('Driver')
@LogConfig({ onlyErrors: true })
export class DriverControllerV3 {
  constructor() {}

  @Get('rating')
  @ApiOperation({ summary: 'Get drivers rating' })
  @ApiResponses({
    200: [GetDriverRatingResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriversRating(@Query() query: GetDriverRatingQueryDtoV3) {}

  @Get('/:driver_id/participation/years')
  @ApiOperation({ summary: 'Get driver events participation years' })
  @ApiResponses({
    200: [GetDriverParticipationYearsOldResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverParticipationYearsOld(@Param('driver_id') driver_id: string) {}

  @Get('/:driver_id/events/participation/years')
  @ApiOperation({ summary: 'Get driver events participation years' })
  @ApiResponses({
    200: [GetDriverParticipationYearsResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverParticipationYears(@Param('driver_id') driver_id: string) {}

  @Get('/:driver_id/photo')
  @ApiOperation({ summary: 'Get driver photo' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Driver photo, jpeg',
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
    200: [GetDriverTimeAttackRecordsResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverRecords(@Param('driver_id') driver_id: string, @Query() query: GetDriverRecordsQueryDtoV3) {}

  @Get('/:driver_id/statistics')
  @ApiOperation({ summary: 'Get driver statistics' })
  @ApiResponses({
    200: GetDriverStatisticsResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverStatistics(@Param('driver_id') driver_id: string, @Query() query: GetDriverStatisticsQueryDtoV3) {}

  @Post()
  @ApiOperation({ summary: 'Create account of driver' })
  @ApiResponses({
    200: AddDriverResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @LogConfig({ responseData: true })
  @HttpCode(200)
  @Auth([AppRole.USER])
  async addDriver(@Session() profileData: ProfileData, @Body() body: AddDriverBodyDtoV3, @Headers() headers: any) {}
}
