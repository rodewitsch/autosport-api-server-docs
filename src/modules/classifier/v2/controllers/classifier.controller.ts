import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { GetClassifierResponseDtoV2 } from '../dto/get-classifier.dto';

@Controller({
  path: 'classifiers',
  version: '2',
})
@ApiTags('Classifier')
@LogConfig({ onlyErrors: true })
export class ClassifierControllerV2 {
  constructor() {}

  @Get(':type')
  @ApiOperation({ summary: 'Get classifier by type' })
  @ApiResponses({
    200: [GetClassifierResponseDtoV2],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getClassifier(@Param('type') type: string) {}
}
