import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessToken } from 'general/decorators/access-token.decorator';
import { ApiResponses } from 'general/decorators/api-responses.decorator';
import { LogConfig } from 'general/decorators/log-config.decorator';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { RealIP } from 'nestjs-real-ip';
import { Auth } from '../../../../decorators/auth.decorator';
import { ParsedUserAgent } from '../../../../decorators/parsed-user-agent.decorator';
import { AppRole } from '../../../../enums/app-roles.enum';
import { ProfileData } from '../../../../interfaces/profile-data.interface';
import { UserAgent } from '../../../../interfaces/user-agent.interface';
import { AvailabilityResponseDtoV2 } from '../dto/availability.dto';
import {
  ConfirmResetPasswordCodeBodyDtoV2,
  ConfirmResetPasswordCodeResponseDtoV2,
} from '../dto/confirm-reset-password-code.dto';
import { ConfirmResetPasswordBodyDtoV2 } from '../dto/confirm-reset-password.dto';
import { ConfirmSignupDtoV2, ConfirmSignupResponseDtoV2 } from '../dto/confirm-signup.dto';
import { RefreshTokenDtoV2 } from '../dto/refresh-token.dto';
import { ResetPasswordBodyDtoV2, ResetPasswordResponseDtoV2 } from '../dto/reset-password.dto';
import { SigninDtoV2, SigninResponseDtoV2 } from '../dto/signin.dto';
import { SignupDtoV2, SignupResponseDtoV2 } from '../dto/signup.dto';

@Controller({
  path: 'auth',
  version: '2',
})
@ApiTags('Auth')
@LogConfig({ onlyErrors: true })
@Controller()
export class AuthControllerV2 {
  constructor() {}

  @Post('signup')
  @ApiOperation({ summary: 'Request for registration in the application' })
  @ApiResponses({
    200: SignupResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async signup(@Body() signupDto: SignupDtoV2) {}

  @Post('signup/confirm')
  @ApiOperation({ summary: 'Request to confirm registration in the application (Email confirmation)' })
  @ApiResponses({
    200: ConfirmSignupResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async confirmSignup(@Body() signupDto: ConfirmSignupDtoV2) {}

  @Post('signin')
  @ApiOperation({ summary: 'Request for authorization in the application' })
  @ApiResponses({
    200: SigninResponseDtoV2,
    400: CommonMessageResponseDto,
    401: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async signin(@RealIP() ip: string, @Body() signinDto: SigninDtoV2, @ParsedUserAgent() userAgent: UserAgent) {}

  @Put('refresh')
  @ApiOperation({ summary: 'Request for refreshing JWT tokens' })
  @ApiResponses({
    200: SigninResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.USER], { ignoreExpiration: true })
  async refreshToken(
    @Session() profileData: ProfileData,
    @Body() body: RefreshTokenDtoV2,
    @AccessToken() accessToken: string,
  ) {}

  @Delete('signout')
  @ApiOperation({ summary: 'Request to log out of the application account' })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @Auth([AppRole.USER])
  async signout(@Session() profileData: ProfileData, @AccessToken() accessToken: string) {}

  @Post('reset')
  @ApiOperation({
    summary: 'The first step of resetting the account password. (Sends the confirmation code to the email)',
  })
  @ApiResponses({
    200: ResetPasswordResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async resetPassword(@Body() body: ResetPasswordBodyDtoV2) {}

  @Post('reset/code/confirm')
  @ApiOperation({
    summary: 'The second step of resetting the account password. (Generates token for resetting the password)',
  })
  @ApiResponses({
    200: ConfirmResetPasswordCodeResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async confirmResetCode(@Body() body: ConfirmResetPasswordCodeBodyDtoV2) {}

  @Post('reset/confirm')
  @ApiOperation({
    summary: 'The last step of resetting the account password. (Changing the password)',
  })
  @ApiResponses({
    200: CommonMessageResponseDto,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  @HttpCode(200)
  async confirmResetPassword(@Body() body: ConfirmResetPasswordBodyDtoV2) {}

  @Get('login/check')
  @ApiOperation({ summary: 'Check login availability' })
  @ApiResponses({
    200: AvailabilityResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async checkLogin(@Query('login') login: string) {}

  @Get('email/check')
  @ApiOperation({ summary: 'Check email availability' })
  @ApiResponses({
    200: AvailabilityResponseDtoV2,
    400: CommonMessageResponseDto,
    500: CommonMessageResponseDto,
  })
  async checkEmail(@Query('email') email: string) {}
}
