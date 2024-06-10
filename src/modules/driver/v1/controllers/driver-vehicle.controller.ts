import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import {
  AddDriverVehicleBodyDtoV1,
  DriverVehicleResponseDtoV1,
  UpdateDriverVehicleBodyDtoV1,
} from '../dto/driver-vehicle.dto';

@Controller({
  path: 'drivers/:driver_id/vehicles',
  version: '1',
})
@ApiTags('Driver vehicle')
@LogConfig({ onlyErrors: true })
export class DriverVehicleControllerV1 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get driver vehicles' })
  @ApiResponses({
    200: [DriverVehicleResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverVehicles(@Param('driver_id') driver_id: string) {}

  @Get(':vehicle_id')
  @ApiOperation({ summary: 'Get driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverVehicle(@Param('driver_id') driver_id: string, @Param('vehicle_id') vehicle_id: string) {}

  @Post()
  @ApiOperation({ summary: 'Add driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  @Auth([AppRole.DRIVER])
  async addDriverVehicle(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Body() body: AddDriverVehicleBodyDtoV1,
  ) {}

  @Patch(':vehicle_id')
  @ApiOperation({ summary: 'Update driver vehicle' })
  @ApiResponses({
    200: DriverVehicleResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.DRIVER])
  async updateDriverVehicle(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('vehicle_id') vehicle_id: string,
    @Body() body: UpdateDriverVehicleBodyDtoV1,
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
}
