import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { GetClassifierTypeResponseDtoV3 } from '../dto/get-classifier-type.dto';

@Controller({
  path: 'classifier-types',
  version: '3',
})
@ApiTags('Classifier')
@LogConfig({ onlyErrors: true })
export class ClassifierTypeControllerV3 {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get classifier types' })
  @ApiResponses({
    200: [GetClassifierTypeResponseDtoV3],
    500: CommonMessageResponseDto,
  })
  async getClassifierTypes() {}
}
