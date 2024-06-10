import { Body, Controller, Get, HttpCode, Post, Query, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { AcceptAgreementBodyDtoV1 } from '../dto/accept-agreement.dto';
import { GetAgreementQueryDtoV1, GetAgreementResponseDtoV1 } from '../dto/get-agreement.dto';

@Controller({
  path: 'agreements',
  version: '1',
})
@ApiTags('Agreement')
@LogConfig({ onlyErrors: true })
export class AgreementControllerV1 {
  constructor() {}
  @Get()
  @ApiOperation({ summary: 'Get agreement text' })
  @ApiResponses({
    200: GetAgreementResponseDtoV1,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getAgreement(@Query() query: GetAgreementQueryDtoV1) {}

  @Post()
  @ApiOperation({ summary: 'Accept agreement' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  @Auth([AppRole.USER])
  async acceptAgreement(@Session() profileData: ProfileData, @Body() body: AcceptAgreementBodyDtoV1) {}
}
