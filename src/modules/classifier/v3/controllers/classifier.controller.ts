import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { GetClassifierResponseDtoV3 } from '../dto/get-classifier.dto';

@Controller({
  path: 'classifiers',
  version: '3',
})
@ApiTags('Classifier')
@LogConfig({ onlyErrors: true })
export class ClassifierControllerV3 {
  constructor() {}

  @Get(':type')
  @ApiOperation({ summary: 'Get classifier by type' })
  @ApiResponses({
    200: [GetClassifierResponseDtoV3],
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getClassifier(@Param('type') type: string) {}
}
