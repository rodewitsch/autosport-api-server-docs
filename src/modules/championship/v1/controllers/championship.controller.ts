import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses, Paginate } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { GetChampionshipClassResponseDtoV1 } from '../dto/get-championship-classes.dto';
import { GetTimeAttackChampionshipEventRatingResponseDtoV1 } from '../dto/get-championship-event-ratings.dto';
import { GetTimeAttackChampionshipEventResultResponseDtoV1 } from '../dto/get-championship-event-result.dto';
import { GetTimeAttackChampionshipRatingResponseDtoV1 } from '../dto/get-championship-ratings.dto';
import { GetChampionshipRulesResponseDtoV1 } from '../dto/get-championship-rules.dto';
import { GetChampionshipsYearsQueryDtoV1 } from '../dto/get-championships-years.dto';
import { GetChampionshipQueryDtoV1, GetChampionshipResponseDtoV1 } from '../dto/get-championships.dto';

@Controller({
  path: 'championships',
  version: '1',
})
@ApiTags('Championship')
@LogConfig({ onlyErrors: true })
export class ChampionshipControllerV1 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get list of championships' })
  @ApiResponses({
    200: Paginate(GetChampionshipResponseDtoV1),
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getChampionships(@Query() query: GetChampionshipQueryDtoV1) {}

  @Get('/rules/:rules_id')
  @ApiOperation({ summary: 'Get rules of the championship' })
  @ApiResponses({
    200: GetChampionshipRulesResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipsRules(@Param('rules_id') rules_id: string) {}

  @Get('/years')
  @ApiOperation({ summary: 'Get list of championships years' })
  @ApiResponses({
    200: [Number],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventsYears(@Query() query: GetChampionshipsYearsQueryDtoV1) {}

  @Get('/:championship_id/image')
  @ApiOperation({ summary: 'Get championship image' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Championship image, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipImage(
    @Param('championship_id') id: string,
    @Query() _: RefreshCacheQueryDto,
    @Res() response: Response,
  ) {}

  @Get('/:championship_id/events/:event_id/ratings')
  @ApiOperation({ summary: 'Get championship event drivers ratings' })
  @ApiResponses({
    200: [GetTimeAttackChampionshipEventRatingResponseDtoV1],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipEventRatings(
    @Param('championship_id') championship_id: string,
    @Param('event_id') event_id: string,
  ) {}

  @Get('/:championship_id/ratings')
  @ApiOperation({ summary: 'Get championship drivers ratings' })
  @ApiResponses({
    200: [GetTimeAttackChampionshipRatingResponseDtoV1],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipRatings(@Param('championship_id') championship_id: string) {}

  @Get('/:championship_id/events/:event_id/drivers/:driver_id/results')
  @ApiOperation({ summary: 'Get championship event driver results' })
  @ApiResponses({
    200: [GetTimeAttackChampionshipEventResultResponseDtoV1],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipEventDriverResults(
    @Param('championship_id') championship_id: string,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
  ) {}

  @Get('/:championship_id/classes')
  @ApiOperation({ summary: 'Get championship classes' })
  @ApiResponses({
    200: [GetChampionshipClassResponseDtoV1],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipClasses(@Param('championship_id') championship_id: string) {}
}
