import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { GetOrganizerEventsYearsResponseDtoV1 } from '../dto/get-organizer-years';
import { GetOrganizerQueryDtoV1, GetOrganizerResponseDtoV1 } from '../dto/get-organizers.dto';

@Controller({
  path: 'organizers',
  version: '1',
})
@ApiTags('Organizer')
@LogConfig({ onlyErrors: true })
export class OrganizerControllerV1 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get organizers' })
  @ApiResponses({
    200: [GetOrganizerResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getOrganizers(@Query() query: GetOrganizerQueryDtoV1) {}

  @Get('/:organizer_id/events/years')
  @ApiOperation({ summary: 'Get organizer events years' })
  @ApiResponses({
    200: [GetOrganizerEventsYearsResponseDtoV1],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getOrganizerEventsYears(@Param('organizer_id') organizer_id: string) {}
}
