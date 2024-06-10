import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses, Paginate } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { I18nTranslations } from '../../../../generated/i18n.generated';
import { GetChampionshipClassResponseDtoV3 } from '../dto/get-championship-classes.dto';
import { GetTimeAttackChampionshipEventRatingResponseDtoV3 } from '../dto/get-championship-event-ratings.dto';
import { GetTimeAttackChampionshipEventResultsResponseDtoV3 } from '../dto/get-championship-event-result.dto';
import { GetTimeAttackChampionshipRatingResponseDtoV3 } from '../dto/get-championship-ratings.dto';
import { GetChampionshipRulesResponseDtoV3 } from '../dto/get-championship-rules.dto';
import { GetChampionshipsYearsQueryDtoV3 } from '../dto/get-championships-years.dto';
import { GetChampionshipQueryDtoV3, GetChampionshipResponseDtoV3 } from '../dto/get-championships.dto';

@Controller({
  path: 'championships',
  version: '3',
})
@ApiTags('Championship')
@LogConfig({ onlyErrors: true })
export class ChampionshipControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get list of championships' })
  @ApiResponses({
    200: Paginate(GetChampionshipResponseDtoV3),
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getChampionships(@Query() query: GetChampionshipQueryDtoV3) {}

  @Get('/years')
  @ApiOperation({ summary: 'Get list of championships years' })
  @ApiResponses({
    200: [Number],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventsYears(@Query() query: GetChampionshipsYearsQueryDtoV3) {}

  @Get(':championship_id')
  @ApiOperation({ summary: 'Get championship' })
  @ApiResponses({
    200: GetChampionshipResponseDtoV3,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getChampionship(@Param('championship_id') championship_id: number) {}

  @Get('/rules/:rules_id')
  @ApiOperation({ summary: 'Get rules of the championship' })
  @ApiResponses({
    200: GetChampionshipRulesResponseDtoV3,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipsRules(@Param('rules_id') rules_id: string) {}

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
    200: [GetTimeAttackChampionshipEventRatingResponseDtoV3],
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
    200: [GetTimeAttackChampionshipRatingResponseDtoV3],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipRatings(@Param('championship_id') championship_id: string) {}

  @Get('/:championship_id/events/:event_id/drivers/:driver_id/results')
  @ApiOperation({ summary: 'Get championship event driver results' })
  @ApiResponses({
    200: [GetTimeAttackChampionshipEventResultsResponseDtoV3],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipEventDriverResults(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Param('championship_id') championship_id: string,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
  ) {}

  @Get('/:championship_id/classes')
  @ApiOperation({ summary: 'Get championship classes' })
  @ApiResponses({
    200: [GetChampionshipClassResponseDtoV3],
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getChampionshipClasses(@Param('championship_id') championship_id: string) {}
}
