import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { RegisterRequestDto } from './dto/register-request.dto'
import { IamService } from './iam.service'
import { LoginRequestDto } from './dto/login-request.dto'
import type { Response } from 'express'
import { CookieService } from './cookie.service'
import type { RequestWithUser } from '../common/guards/refresh-token.guard'
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard'

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
    const { accessToken, refreshToken } = await this.iamService.login(body)
    this.cookieService.setAuthCookies(res, accessToken, refreshToken)
    return { ok: true }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ ok: boolean }> {
    const { accessToken, refreshToken } = await this.iamService.refresh(req.user!.sub)
    this.cookieService.setAuthCookies(res, accessToken, refreshToken)
    return { ok: true }
  }
}
