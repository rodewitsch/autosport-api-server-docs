import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { AddDriverTiresBodyDtoV2, DriverTiresResponseDtoV2 } from '../dto/driver-tires.dto';

@Controller({
  path: 'drivers/:driver_id/tires',
  version: '2',
})
@Auth([AppRole.DRIVER])
@ApiTags('Driver tires')
@LogConfig({ onlyErrors: true })
export class DriverTiresControllerV2 {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Add driver tires' })
  @ApiResponses({
    200: DriverTiresResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async addDriverTires(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Body() body: AddDriverTiresBodyDtoV2,
  ) {}

  @Patch(':tires_id')
  @ApiOperation({ summary: 'Update driver tires' })
  @ApiResponses({
    200: DriverTiresResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async updateDriverTires(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('tires_id') tires_id: string,
    @Body() body: AddDriverTiresBodyDtoV2,
  ) {}

  @Get(':tires_id')
  @ApiOperation({ summary: 'Get driver tires' })
  @ApiResponses({
    200: DriverTiresResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverTires(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('tires_id') tires_id: string,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get driver tires list' })
  @ApiResponses({
    200: [DriverTiresResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverTiresList(@Session() profileData: ProfileData, @Param('driver_id') driver_id: string) {}

  @Delete(':tires_id')
  @ApiOperation({ summary: 'Delete driver tires' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async deleteDriverTires(
    @Session() profileData: ProfileData,
    @Param('driver_id') driver_id: string,
    @Param('tires_id') tires_id: string,
  ) {}
}
