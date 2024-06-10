import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Session } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { I18nTranslations } from '../../../../generated/i18n.generated';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { AddEventMemberDtoV1, OwnEventMemberResponseDtoV1 } from '../dto/add-event-member.dto';
import { CheckInBodyDtoV1 } from '../dto/check-in.dto';
import {
  ChangeEventMemberDistributionBodyDtoV1,
  GetEventMemberDistributionResponseDtoV1,
  GetEventMembersForDistributionQueryDtoV1,
  GetGroupedEventMemberDistributionResponseDtoV1,
} from '../dto/event-members-distribution.dto';
import { GetEventMemberResponseDtoV1 } from '../dto/get-event-members.dto';

@Controller({
  path: 'events',
  version: '1',
})
@ApiTags('Event membership')
@LogConfig({ onlyErrors: true })
export class EventMembershipControllerV1 {
  constructor() {}

  @Get('/:event_id/members')
  @Auth([AppRole.GUEST])
  @ApiOperation({ summary: 'Get event members' })
  @ApiResponses({
    200: [GetEventMemberResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventMembers(@Param('event_id') event_id: string) {}

  @Get('/:event_id/members/distribution')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Get event members for distribution' })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    content: {
      'application/json': {
        examples: {
          ungrouped: {
            value: [
              {
                driver_id: 96,
                first_name: 'test2',
                last_name: 'test2',
                check_in: false,
                vehicle_id: 1938,
                vehicle_name: 'BMW M3 G80',
                tires_id: 1585,
                tires_name: 'Yokohama AD09',
                c_drive_type: 3,
                drive_type: 'AWD',
                start_num: 1,
                c_group_num: 1,
                group_num: null,
                best_result: null,
              },
            ],
          },
          grouped: {
            value: [
              {
                c_group_num: 1,
                group_num: null,
                members: [
                  {
                    driver_id: 96,
                    check_in: false,
                    first_name: 'test2',
                    last_name: 'test2',
                    vehicle_id: 1938,
                    vehicle_name: 'BMW M3 G80',
                    tires_id: 1585,
                    tires_name: 'Yokohama AD09',
                    c_drive_type: 3,
                    drive_type: 'AWD',
                    start_num: 1,
                    c_group_num: 1,
                    group_num: null,
                    best_result: null,
                  },
                ],
              },
              {
                c_group_num: 0,
                group_num: null,
                members: [
                  {
                    driver_id: 1093,
                    check_in: false,
                    first_name: 'test',
                    last_name: 'test',
                    vehicle_id: 1967,
                    vehicle_name: 'Tret',
                    tires_id: 1602,
                    tires_name: 'Freg',
                    c_drive_type: 2,
                    drive_type: 'RWD',
                    start_num: null,
                    c_group_num: 0,
                    group_num: null,
                    best_result: null,
                  },
                ],
              },
            ],
          },
        },
        schema: {
          oneOf: [
            {
              $ref: '#/components/schemas/GetEventMemberDistributionResponseDtoV1',
              description: 'Ungrouped list',
            },
            {
              $ref: '#/components/schemas/GetGroupedEventMemberDistributionResponseDtoV1',
              description: 'Grouped list',
            },
          ],
        },
      },
    },
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @ApiExtraModels(GetGroupedEventMemberDistributionResponseDtoV1, GetEventMemberDistributionResponseDtoV1)
  async getEventMembersForDistribution(
    @Param('event_id') event_id: string,
    @Query() query: GetEventMembersForDistributionQueryDtoV1,
  ) {}

  @Patch('/:event_id/members/:driver_id/distribution')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Change distribution of event member' })
  @ApiResponses({
    200: GetEventMemberDistributionResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async changeEventMemberDistribution(
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: ChangeEventMemberDistributionBodyDtoV1,
  ) {}

  @Get('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Get driver participation status. (Request for driver itself)' })
  @ApiResponses({
    200: OwnEventMemberResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.DRIVER])
  async getEventDriverParticipationInfo(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {}

  @Post('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Registration for participation in the event' })
  @Auth([AppRole.DRIVER])
  @ApiResponses({
    200: OwnEventMemberResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async addEventMember(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: AddEventMemberDtoV1,
  ) {}

  @Put('/:event_id/members/:driver_id/check-in')
  @ApiOperation({ summary: 'Set event visit flag' })
  @Auth([AppRole.ORGANIZER])
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async setCheckIn(
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: CheckInBodyDtoV1,
  ) {}

  @Patch('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Update driver participation status' })
  @Auth([AppRole.DRIVER])
  @ApiResponses({
    200: OwnEventMemberResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async patchEventMember(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: AddEventMemberDtoV1,
  ) {}

  @Delete('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Cancel driver participation in the event' })
  @Auth([AppRole.DRIVER])
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async deleteEventMember(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
  ) {}
}
