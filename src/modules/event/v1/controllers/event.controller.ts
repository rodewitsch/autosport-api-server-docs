import { Body, Controller, Get, Param, Put, Query, Res, Session } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses, Paginate } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { ChangeEventStatusBodyDtoV1 } from '../dto/change-event-status.dto';
import { GetEventResultsQueryDtoV1, GetTimeAttackResultsResponseDtoV1 } from '../dto/get-event-results.dto';
import { GetEventRulesResponseDtoV1 } from '../dto/get-event-rules.dto';
import { GetEventYearsQueryDtoV1 } from '../dto/get-events-years.dto';
import { GetEventQueryDtoV1, GetEventResponseDtoV1 } from '../dto/get-events.dto';
import { GetUpdatedEventQueryDtoV1 } from '../dto/get-updated-events.dto';

@Controller({
  path: 'events',
  version: '1',
})
@ApiTags('Event')
@LogConfig({ onlyErrors: true })
export class EventControllerV1 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get events' })
  @ApiResponses({
    200: Paginate(GetEventResponseDtoV1),
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getEvents(@Session() profileData: ProfileData, @Query() query: GetEventQueryDtoV1) {}

  @Get('/updated')
  @ApiOperation({ summary: 'Get updated events (since some date)' })
  @ApiResponses({
    200: [GetEventResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getUpdatedEvents(@Session() profileData: ProfileData, @Query() query: GetUpdatedEventQueryDtoV1) {}

  @Get('/rules/:rules_id')
  @ApiOperation({ summary: 'Get event rules' })
  @ApiResponses({
    200: GetEventRulesResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventsRules(@Param('rules_id') rules_id: string) {}

  @Get('/years')
  @ApiOperation({ summary: 'Get events years' })
  @ApiResponses({
    200: [Number],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventsYears(@Query() query: GetEventYearsQueryDtoV1) {}

  @Get('/:event_id')
  @ApiOperation({ summary: 'Get event information' })
  @ApiResponses({
    200: GetEventResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getEvent(@Param('event_id') event_id: string) {}

  @Put('/:event_id/status')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Update event status' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async changeEventStatus(@Param('event_id') event_id: string, @Body() body: ChangeEventStatusBodyDtoV1) {}

  @Get('/:event_id/image')
  @ApiOperation({ summary: 'Get event image' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Event image, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventImage(@Param('event_id') id: string, @Query() _: RefreshCacheQueryDto, @Res() response: Response) {}

  @Get('/:event_id/results')
  @ApiOperation({ summary: 'Get event results' })
  @ApiResponses({
    200: [GetTimeAttackResultsResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventResults(
    @I18n() i18n: I18nContext,
    @Param('event_id') id: string,
    @Query() query: GetEventResultsQueryDtoV1,
  ) {}
}
