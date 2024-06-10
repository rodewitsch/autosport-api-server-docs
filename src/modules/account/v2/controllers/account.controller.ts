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
  GetUpdatedAccountInformationQueryDtoV2,
  UpdatedAccountInformationResponseDtoV2,
} from '../dto/get-updated-account-info';
import { SaveDeviceTokenDtoV2 } from '../dto/save-device-token.dto';
import { UpdateAccountBodyDtoV2, UpdateAccountResponseDtoV2 } from '../dto/update-account.dto';

@Controller({
  path: 'accounts',
  version: '2',
})
@ApiTags('Account')
@LogConfig({ onlyErrors: true })
export class AccountControllerV2 {
  constructor() {}

  @Patch(':account_id')
  @ApiOperation({ summary: 'Update account data' })
  @Auth([AppRole.USER])
  @ApiResponses({
    200: UpdateAccountResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async updateAccount(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: string,
    @Headers() headers: any,
    @Body() body: UpdateAccountBodyDtoV2,
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
    200: UpdatedAccountInformationResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async getUpdatedAccountInformation(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: string,
    @Query() query: GetUpdatedAccountInformationQueryDtoV2,
  ) {}

  @Post('/:account_id/photo')
  @ApiOperation({ summary: 'Save account/driver photo. Replace the previous photo if it exists' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
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
  @HttpCode(200)
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

  @Post('/:account_id/device/token')
  @ApiOperation({ summary: 'Save device push token' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  @Auth([AppRole.USER])
  async saveDeviceToken(
    @Session() profileData: ProfileData,
    @Param('account_id') account_id: number,
    @Body() body: SaveDeviceTokenDtoV2,
    @Headers() headers: any,
  ) {}
}
