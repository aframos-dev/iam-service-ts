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
import { CookieService } from './cookie.service'

@Controller('iam')
export class IamController {
  constructor(
    private readonly iamService: IamService,
    private readonly cookieService: CookieService,
  ) {}

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

    this.cookieService.setAuthCookies(res, accessToken, refreshToken)

    return { ok: true }
  }
}
