import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Res, Session } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import {
  AddDriverVehicleBodyDtoV3,
  DriverVehicleResponseDtoV3,
  UpdateDriverVehicleBodyDtoV3,
} from '../dto/driver-vehicle.dto';

@Controller({
  path: 'drivers/:driver_id/vehicles',
  version: '3',
})
@ApiTags('Driver vehicle')
@LogConfig({ onlyErrors: true })
export class DriverVehicleControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get driver vehicles' })
  @ApiResponses({
    200: [DriverVehicleResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverVehicles(@Param('driver_id') driver_id: string) {}

  @Get(':vehicle_id')
  @ApiOperation({ summary: 'Get driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverVehicle(@Param('driver_id') driver_id: string, @Param('vehicle_id') vehicle_id: string) {}

  @Post()
  @ApiOperation({ summary: 'Add driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  @Auth([AppRole.DRIVER])
  async addDriverVehicle(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Body() body: AddDriverVehicleBodyDtoV3,
  ) {}

  @Patch(':vehicle_id')
  @ApiOperation({ summary: 'Update driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV3,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.DRIVER])
  async updateDriverVehicle(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('vehicle_id') vehicle_id: string,
    @Body() body: UpdateDriverVehicleBodyDtoV3,
  ) {}

  @Delete(':vehicle_id')
  @ApiOperation({ summary: 'Delete driver vehicle' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.DRIVER])
  async deleteDriverVehicle(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('vehicle_id') vehicle_id: string,
  ) {}

  @Get(':vehicle_id/photo')
  @ApiOperation({ summary: 'Get vehicle photo.' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Vehicle photo, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverVehiclePhoto(
    @Param('driver_id') driver_id: string,
    @Param('vehicle_id') vehicle_id: string,
    @Query() _: RefreshCacheQueryDto,
    @Res() response: Response,
  ) {}
}
