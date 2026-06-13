import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { IamService } from './iam.service'
import { LoginRequestDto } from './dto/login-request.dto'
import type { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('iam')
export class IamController {
  private readonly isProd: boolean

  constructor(
    private readonly iamService: IamService,
    private readonly configService: ConfigService,
  ) {
    this.isProd = this.configService.getOrThrow<string>('NODE_ENV') === 'production'
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterRequestDto): Promise<{ ok: boolean }> {
    await this.iamService.register(body)
    return { ok: true }
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ ok: boolean }> {
    if (body.email !== 'root@root.com' || body.password !== 'root123456789')
      throw new InternalServerErrorException('Temporary authentication error')

    const accessToken = 'access-token-example'
    const refreshToken = 'refresh-token-example'

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN'),
    })

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: 'lax',
      path: '/iam/refresh',
      maxAge: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN'),
    })

    return { ok: true }
  }
}
