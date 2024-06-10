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
import { AddEventMemberDtoV2, OwnEventMemberResponseDtoV2 } from '../dto/add-event-member.dto';
import { CheckInBodyDtoV2 } from '../dto/check-in.dto';
import {
  ChangeEventMemberDistributionBodyDtoV2,
  GetEventMemberDistributionResponseDtoV2,
  GetEventMembersForDistributionQueryDtoV2,
  GetGroupedEventMemberDistributionResponseDtoV2,
} from '../dto/event-members-distribution.dto';
import { GetEventMemberResponseDtoV2 } from '../dto/get-event-members.dto';
import { GetEventRegistrationQrResponseDto } from '../dto/get-event-registration-qr.dto';

@Controller({
  path: 'events',
  version: '2',
})
@ApiTags('Event membership')
@LogConfig({ onlyErrors: true })
export class EventMembershipControllerV2 {
  constructor() {}

  @Get('/:event_id/members')
  @Auth([AppRole.GUEST])
  @ApiOperation({ summary: 'Get event members' })
  @ApiResponses({
    200: [GetEventMemberResponseDtoV2],
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
              $ref: '#/components/schemas/GetEventMemberDistributionResponseDtoV2',
              description: 'Ungrouped list',
            },
            {
              $ref: '#/components/schemas/GetGroupedEventMemberDistributionResponseDtoV2',
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
  @ApiExtraModels(GetGroupedEventMemberDistributionResponseDtoV2, GetEventMemberDistributionResponseDtoV2)
  async getEventMembersForDistribution(
    @Param('event_id') event_id: string,
    @Query() query: GetEventMembersForDistributionQueryDtoV2,
  ) {}

  @Patch('/:event_id/members/:driver_id/distribution')
  @Auth([AppRole.ORGANIZER])
  @ApiOperation({ summary: 'Change distribution of event member' })
  @ApiResponses({
    200: GetEventMemberDistributionResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async changeEventMemberDistribution(
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: ChangeEventMemberDistributionBodyDtoV2,
  ) {}

  @Get('/:event_id/members/registration-qr')
  @ApiOperation({ summary: 'Get QR code for event registration' })
  @Auth([AppRole.ORGANIZER])
  @ApiResponses({
    200: GetEventRegistrationQrResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getEventRegistrationQr(@Param('event_id') event_id: string) {}

  @Get('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Get driver participation status. (Request for driver itself)' })
  @ApiResponses({
    200: OwnEventMemberResponseDtoV2,
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
    200: OwnEventMemberResponseDtoV2,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async addEventMember(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: AddEventMemberDtoV2,
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
    @Body() body: CheckInBodyDtoV2,
  ) {}

  @Patch('/:event_id/members/:driver_id')
  @ApiOperation({ summary: 'Update driver participation status' })
  @Auth([AppRole.DRIVER])
  @ApiResponses({
    200: OwnEventMemberResponseDtoV2,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async patchEventMember(
    @Session() profileData: ProfileData,
    @Param('event_id') event_id: string,
    @Param('driver_id') driver_id: string,
    @Body() body: AddEventMemberDtoV2,
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
