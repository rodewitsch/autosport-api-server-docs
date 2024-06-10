import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RefreshCacheQueryDto } from 'general/dto/refresh-cache.query.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import {
  GetUpdatedAccountInformationQueryDtoV1,
  UpdatedAccountInformationResponseDtoV1,
} from '../dto/get-updated-account-info';
import { UpdateAccountBodyDtoV1, UpdateAccountResponseDtoV1 } from '../dto/update-account.dto';

@Controller({
  path: 'accounts',
  version: '1',
})
@ApiTags('Account')
@LogConfig({ onlyErrors: true })
export class AccountControllerV1 {
  constructor() {}

  @Patch(':account_id')
  @ApiOperation({ summary: 'Update account data' })
  @Auth([AppRole.USER])
  @ApiResponses({
    200: UpdateAccountResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async updateAccount(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: string,
    @Headers() headers: any,
    @Body() body: UpdateAccountBodyDtoV1,
  ) {}

  @Get('/:account_id/photo')
  @ApiOperation({ summary: 'Get account photo. (The same as get driver photo request)' })
  @ApiProduces('image/jpeg')
  @ApiResponse({
    status: 200,
    description: 'Event image, jpeg',
  })
  @ApiResponses({
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getDriverPhoto(
    @Param('account_id') account_id: string,
    @Query() _: RefreshCacheQueryDto,
    @Res() response: Response,
  ) {}

  @Get('/:account_id/updated')
  @ApiOperation({ summary: 'Get account updated information. Returns empty object if information not modified' })
  @Auth([AppRole.USER])
  @ApiResponses({
    200: UpdatedAccountInformationResponseDtoV1,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getUpdatedAccountInformation(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: string,
    @Query() query: GetUpdatedAccountInformationQueryDtoV1,
  ) {}

  @Post('/:account_id/photo')
  @ApiOperation({ summary: 'Save account/driver photo. Replace the previous photo if it exists' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Auth([AppRole.USER])
  async addDriverPhoto(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {}

  @Delete('/:account_id/photo')
  @ApiOperation({ summary: 'Remove account/driver photo' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.USER])
  async deleteDriverPhoto(@Session() profileData: ProfileData, @Param('account_id') account_id: string) {}
}
