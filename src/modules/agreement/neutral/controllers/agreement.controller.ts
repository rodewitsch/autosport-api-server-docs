import { Controller, Get, Res, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';

@Controller({
  path: 'agreements',
})
@ApiTags('Agreement')
@LogConfig({ onlyErrors: true })
export class AgreementControllerNeutral {
  constructor() {}

  @Get('/privacy-policy.pdf')
  @Version(VERSION_NEUTRAL)
  @ApiOperation({ summary: 'Get agreement file' })
  @ApiProduces('application/pdf')
  @ApiResponse({
    status: 200,
    description: 'Agreement file',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    404: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getPrivacyPolicy(@Res() response: Response) {}
}
