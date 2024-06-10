import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { GetOrganizerEventsYearsResponseDtoV3 } from '../dto/get-organizer-years';
import { GetOrganizerQueryDtoV3, GetOrganizerResponseDtoV3 } from '../dto/get-organizers.dto';

@Controller({
  path: 'organizers',
  version: '3',
})
@ApiTags('Organizer')
@LogConfig({ onlyErrors: true })
export class OrganizerControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get organizers' })
  @ApiResponses({
    200: [GetOrganizerResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getOrganizers(@Query() query: GetOrganizerQueryDtoV3) {}

  @Get('/:organizer_id/events/years')
  @ApiOperation({ summary: 'Get organizer events years' })
  @ApiResponses({
    200: [GetOrganizerEventsYearsResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getOrganizerEventsYears(@Param('organizer_id') organizer_id: string) {}
}
