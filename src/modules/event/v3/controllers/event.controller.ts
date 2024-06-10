import { Body, Controller, Get, Param, Put, Query, Res, Session } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses, Paginate } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { ChangeEventRoadConditionBodyDtoV3 } from '../dto/change-event-road-condition.dto';
import { ChangeEventStatusBodyDtoV3 } from '../dto/change-event-status.dto';
import {
  GetDragResultsResponseDtoV3,
  GetEventResultsQueryDtoV3,
  GetTimeAttackResultsResponseDtoV3,
} from '../dto/get-event-results.dto';
import { GetEventRulesResponseDtoV3 } from '../dto/get-event-rules.dto';
import { GetEventYearsQueryDtoV3 } from '../dto/get-events-years.dto';
import { GetEventQueryDtoV3, GetEventResponseDtoV3, GetEventsQueryDtoV3 } from '../dto/get-events.dto';
import { GetUpdatedEventQueryDtoV3 } from '../dto/get-updated-events.dto';

@Controller({
  path: 'events',
  version: '3',
})
@ApiTags('Event')
@LogConfig({ onlyErrors: true })
export class EventControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get events' })
  @ApiResponses({
    200: Paginate(GetEventResponseDtoV3),
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getEvents(@Session() profileData: ProfileData, @Query() query: GetEventsQueryDtoV3) {}

  @Get('/updated')
  @ApiOperation({ summary: 'Get updated events (since some date)' })
  @ApiResponses({
    200: [GetEventResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getUpdatedEvents(@Session() profileData: ProfileData, @Query() query: GetUpdatedEventQueryDtoV3) {}

  @Get('/rules/:rules_id')
  @ApiOperation({ summary: 'Get event rules' })
  @ApiResponses({
    200: GetEventRulesResponseDtoV3,
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
  async getEventsYears(@Query() query: GetEventYearsQueryDtoV3) {}

  @Get('/:event_id')
  @ApiOperation({ summary: 'Get event information' })
  @ApiResponses({
    200: GetEventResponseDtoV3,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.GUEST])
  async getEvent(@Param('event_id') event_id: string, @Query() query: GetEventQueryDtoV3) {}

  @Put('/:event_id/status')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Update event status' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async changeEventStatus(@Param('event_id') event_id: string, @Body() body: ChangeEventStatusBodyDtoV3) {}

  @Put('/:event_id/road-condition')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Update event road condition' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async changeEventRoadCondition(
    @Param('event_id') event_id: string,
    @Body() body: ChangeEventRoadConditionBodyDtoV3,
  ) {}

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
  @ApiResponse({
    status: 200,
    description: 'Event results',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            { $ref: '#/components/schemas/GetTimeAttackResultsResponseDtoV3' },
            { $ref: '#/components/schemas/GetDragResultsResponseDtoV3' },
          ],
        },
        examples: {
          'TIME-ATTACK': {
            value: {
              number: 0,
              records: [
                {
                  id: 0,
                  driver_id: 0,
                  vehicle_id: 0,
                  power_den_class_id: 0,
                  first_name: 'string',
                  last_name: 'string',
                  vehicle_name: 'string',
                  tires_name: 'string',
                  results: [
                    {
                      id: '0',
                      lap_number: 0,
                      lap_time: 'string',
                      best_result: true,
                      penalty_time: 0,
                      canceled: true,
                      c_road_condition: 0,
                    },
                  ],
                },
              ],
            },
          },
          DRAG: {
            value: [
              {
                number: 1,
                records: [
                  {
                    id: 1,
                    pilot_number: '1',
                    reaction_time: '0.501',
                    sixty_feet: '6.731',
                    half_distance_elapsed_time: null,
                    full_distance_elapsed_time: '14.583',
                    full_time: '15.084',
                    speed: '138.3',
                    canceled: null,
                    winner: true,
                    c_lane: 1,
                    c_road_condition: 1,
                  },
                ],
              },
              {
                number: 2,
                records: [
                  {
                    id: 2,
                    pilot_number: '2',
                    reaction_time: '0.675',
                    sixty_feet: '6.509',
                    half_distance_elapsed_time: null,
                    full_distance_elapsed_time: '14.589',
                    full_time: '15.264',
                    speed: '206.5',
                    canceled: null,
                    winner: false,
                    c_lane: 2,
                    c_road_condition: 1,
                  },
                ],
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
  @ApiExtraModels(GetTimeAttackResultsResponseDtoV3, GetDragResultsResponseDtoV3)
  async getEventResults(
    @I18n() i18n: I18nContext,
    @Param('event_id') id: string,
    @Query() query: GetEventResultsQueryDtoV3,
  ) {}
}
